# interexy-backend

Back-End part of application created as a test task for Junior Full-stack developer in Interexy. Its main purpose is to handle users authorization.
Built with Node JS, Express JS, Typescript and MongoDB.

Front-End part can be found [online](https://natashapridanova.github.io/interexy-frontend/) and run [locally](https://github.com/NatashaPridanova/interexy-backend).

## How to run server app locally

- Clone the repo
- Run 'npm install'
- Create in your root directory a file called .env and put there the following:

```
PORT=5000
MONGO_URL=mongodb+srv://<insert here the key>:<insert here the key>@cluster0.l4hnc9u.mongodb.net/interexy-users?retryWrites=true&w=majority
JWT_SECRET_KEY=<insert here a string of your choice>
JWT_EXPIRE_TIME=1200
```

note: you can get the key to connect to the database from my message, don't forget to insert a JWT_SECRET_KEY as a string of your choice

- Run 'npm run build'
- Run 'npm start'

### Prerequisites

To use server app, you need to have the following prerequisites installed:

- Node >= 14.0.0 (Mine is 16.13.2)
- npm >= 5.6 (Mine is 8.19.2)
- IDE of your choice
