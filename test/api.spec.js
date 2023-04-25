var chai = require('chai')
var expect = chai.expect
let chaiHttp = require('chai-http')

let server = require('../app')

chai.use(chaiHttp)

describe("Pet Get API Check", function() {
    it("Get pets", function(done) {
        chai.request(server)
        .get('/api/pet/all')
        .end((err,res)=> {
            expect(res.status).to.be.equal(200)
            expect(res.body.message).to.be.equal('Pets Found')
            expect(res.body.data[0]).to.include.keys('name','type','sex','breed','age','vaccinated',
            'otherpets','otherhumans','trained','additional','imageUrl','owner','phone','address','isAdopt',
            'pincode', '_id')

            done()
        })
    }).timeout(5000);
})

describe("User API Check", function() {
    it("List Profiles", function(done) {
        chai.request(server)
        .get('/api/user/listProfiles')
        .end((err,res)=> {
            expect(res.status).to.be.equal(200)
            expect(res.body.data[0]).to.include.keys('_id','fname','lname','phone','username','email',
            'address','state','zip','city','password','imageUrl','isAdmin','adopted','rescued')

            done()
        })
    })
})

describe("Pet Post API Check", function() {
    it("Add pet", function(done) {
        
      const newPet = {
        name: "Fluffy",
        type: "cat",
        sex: "female",
        breed: "Persian",
        age: 2,
        vaccinated: true,
        otherpets: false,
        otherhumans: true,
        trained: true,
        additional: "Likes to play with toys",
        imageUrl: "https://www.example.com/fluffy.jpg",
        owner: "John",
        phone: "555-555-1212",
        address: "123 Main St",
        isAdopt: false,
        pincode: "12345"
      };
  
      const username = "641f34d75e26ab8564e00ded";
  
      chai.request(server)
        .post(`/api/pet/addPet/${username}`)
        .send(newPet)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.be.equal("Pet has been added!");
  
          done();
        });
    });
  });
  
  describe("Login API Check", function() {
    it("Valid login credentials should return user data", function(done) {
        const username = "tejasajay";
        const password = "hello";

        chai.request(server)
            .post('/api/user/login')
            .send( {username, password} )
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.status).to.be.equal(200);
                expect(res.body.username).to.be.equal(username);
                expect(res.body.LoginDetails).to.have.property('_id');
                expect(res.body.LoginDetails).to.have.property('username');

                done();
            });
    });

    it("Invalid login credentials should return error message", function(done) {
        const username = "testuser";
        const password = "wrongpassword";

        chai.request(server)
            .post('/api/user/login')
            .send({ username, password })
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.status).to.be.equal(400);
                expect(res.body.message).to.be.equal("Invalid credentials");

                done();
            });
    });
});
