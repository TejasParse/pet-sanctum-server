const mongoose = require('mongoose')
const exec = mongoose.Query.prototype.exec;
const redis = require('redis');
let redisClient;
(async () => {
    redisClient = redis.createClient({
        password: 'OGEMlJ2hTqzrXspsMXbrAKl8JUCokIRB',
        socket: {
            host: 'redis-14122.c251.east-us-mz.azure.cloud.redislabs.com',
            port: 14122
        }
    });
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    redisClient.on("connect", () => console.log(`Connected to redis`));
    await redisClient.connect();
})();

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || 'default')
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments)
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))
    const cachedVal = await redisClient.HGET(this.hashKey, key)
    //console.log(cachedVal)
    if (cachedVal) {
        const doc = JSON.parse(cachedVal)
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }
    const result = await exec.apply(this, arguments)
    await redisClient.HSET(this.hashKey, key, JSON.stringify(result))
    return result
}

module.exports = {
    async clearHash(hashKey) {
        redisClient.del(JSON.stringify(hashKey));
    }
}