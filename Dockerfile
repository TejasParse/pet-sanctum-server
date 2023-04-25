FROM node:16.15.0-alpine

# working dir
WORKDIR "/user/app"

# Copy Package Json files
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80
CMD ["npm", "start"]

# Install 