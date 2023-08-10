import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import Right from './Right';
import './QuesSelector.css'
import QuestionSolver from './QuestionSolver';

function QuesSelector(props) {
    const { user_id } = props;
    const [questions, setQuestions] = useState([]);
    const [q_id,set_q_id ] = useState(-1);
    useEffect(() => {
        // Fetch the list of questions from the API
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_ques');
                setQuestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestions();
    }, []);
    if(q_id!=-1){
        
        return <QuestionSolver user_id={user_id} ques_id={q_id}/>
        
    }
    return (
        <div className='dad_1'>
            <div className='navbar'>
                <img src={logo} alt='Logo' className='logo' />
                <h5 style={{ marginRight: '8px' }}>@{user_id}</h5>
            </div>

            <div>
                <h2 className='list'>Question List</h2>
                {questions.map((question) => (

                    <div key={question.ques_id} onClick={() => handleQuestionClick(question)} className='box_p'>
                        <div className='ques_name'>
                            <h4>{question.name}</h4>
                            
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );

    function handleQuestionClick(question) {
        // Handle the click event when a question is selected
        set_q_id(question.ques_id);
       
        
    }
    
}

export default QuesSelector;
