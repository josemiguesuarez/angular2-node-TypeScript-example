import * as express from 'express';

const hello = express.Router();
// placeholder route handler
hello.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World!'
  });
});

export default hello;
