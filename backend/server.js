const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
           const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch((err) => console.log(err));

// app.listen(5000, () => {
//         console.log('Server started on port 5000');
// });
// const usersRouter = require('./routes/new_user.js');
// app.use(usersRouter);

const compile_router = require('./routes/compilev2.js');
app.use(compile_router);


const run_router = require('./routes/runv1.js');
app.use(run_router);

// const add_ques_router = require('./routes/compilev2.js');
// app.use(add_ques_router);

const add_ques_router = require('./routes/add_ques.js');
app.use(add_ques_router);

const get_ques = require('./routes/get_ques.js');
app.use(get_ques);

const log_in = require('./routes/user.js');
app.use(log_in);

const all_ques = require('./routes/all_ques.js');
app.use(all_ques);


  