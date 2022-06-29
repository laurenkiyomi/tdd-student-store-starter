const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { NotFoundError } = require("./utils/errors")
const store = require('./routes/store');
const purchases = require('./routes/purchases');
const cors = require('cors')

const app = express(); 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.use('/store', store)
app.use('/purchases', purchases)

app.get('/', (req, res) => {
    res.status(200).send({ "ping": "pong" })  
  }) 

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
    return next(new NotFoundError())
  })
  
/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message
  
    return res.status(status).json({
      error: { message, status },
    })
})

module.exports = app;