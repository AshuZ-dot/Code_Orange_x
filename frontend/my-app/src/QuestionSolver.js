import React from 'react';
import axios from 'axios';
import './Ques_solve.css';
import Left from './Left';
import logo from './logo.png';
import Right from './Right.js';
function QuestionSolver(props) {

  const { user_id, ques_id } = props;

  return (
    <div className='dad'>
      <div className='navbar'>
        <img src={logo} alt='Logo' className='logo' />
      </div>
      <div className='main'>
        <div className='left'>
          <Left ques_id={ques_id} />
        </div>
        <div className='right'>
          <Right user_id="ashu" ques_id={ques_id} />
        </div>
      </div>
    </div>
  );
}

export default QuestionSolver;
