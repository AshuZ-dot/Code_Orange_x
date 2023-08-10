import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Left.css'

function Left(props) {
  
  const {ques_id} = props;

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/get_question/${ques_id}`)
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [ques_id]);

  if (!question) {
    return <div>Loading...</div>;
  }
  
  return (
    
    <div>
       
       <p>Question ID: {ques_id}</p>
        
        
      
      <h1>{question.name}</h1>
      <pre className='ques'>{question.question}</pre>
      <h2>Sample Testcases:</h2>
      {question.testcases.map((testcase, index) => (
        <div key={index} className='test_case'>
          <h3>Testcase {index + 1}</h3>
          <h4>Input</h4>
          <pre>{testcase.input.toString().trim()}</pre>
          <h4>Expected Output:</h4>
          <pre>{testcase.expectedOutput.toString().trim()}</pre>
        </div>
      ))}
    </div>
  );
}

export default Left;
