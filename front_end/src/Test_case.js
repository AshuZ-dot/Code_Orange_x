import React from 'react';
import './test_case.css';


function Test_case(props) {
    const { t_input } = props;
    const { t_exp } = props;
    const { t_out } = props;

    return (
        <div className='main_div'>
            <div className='input'>
                <h4 className='h5'>Input</h4>
                <pre className='t_input'>{t_input}</pre>
            </div>

            <div className='output'>
                <div className='exp_out'>
                    <h4 className='h5'>Expected Output</h4>
                    <pre>{t_exp}</pre>
                </div>

                <div className='out'>
                    <h4 className='h5'>Output</h4>
                    <pre>{t_out}</pre>
                </div>
                
                
            </div>

        </div>
    )
}

export default Test_case