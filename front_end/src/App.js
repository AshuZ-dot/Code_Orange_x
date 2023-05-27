import React, { useState } from 'react';
import axios from 'axios';
import QuestionSolver from './QuestionSolver';
import AddQuestion from './AddQuestion.js';
import './globalStyles.css';

import Login from './Login';

const App = () => {
  return (
    <div>
   <Login />
    </div>
  );
};

export default App;


//<QuestionSolver user_id="ashu" ques_id={10}/>
//<AddQuestion/>
//<Login />