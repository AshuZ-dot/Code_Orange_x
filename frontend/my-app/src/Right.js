import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Right.css';
import Test_case from './Test_case.js';

function Right(props) {

  const { ques_id } = props;
  const { user_id } = props;
  const [question, setQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState("codeEditor");
  const [code, setCode] = useState("//write code here");
  const [solution, setSolution] = useState("");
  const [is_compiled, setIsCompiled] = useState(false);
  const [compilation_error, set_comp_error] = useState("");
  const [output_1, set_out1] = useState("");
  const [output_2, set_out2] = useState("");
  const [output_3, set_out3] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [t1, set_t1] = useState(0);
  const [t2, set_t2] = useState(0);
  const [t3, set_t3] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:5000/get_question/${ques_id}`)
      .then(response => {
        setQuestion(response.data);
        setSolution(response.data.solution);
      })
      .catch(error => {
        console.log(error);
      });
  }, [ques_id]);

  const handleTabClick = (tabName) => {
    if (activeTab === "codeEditor") {
      // Save the value of the textarea to state when switching away from the "codeEditor" tab
      setCode(document.querySelector(".code_edit").value);
    }
    setActiveTab(tabName);
  }

  const handleCodeChange = (event) => {
    setIsCompiled(false);
    setShowButtons(false);
    setCode(event.target.value);
  }

  const handleCompile = async () => {
    //alert(question.testcases[0].input);
    try {
      const response = await axios.post('http://localhost:5000/compile', {
        name: user_id,
        code: code,
      });

      //alert(response.data);
      let jatt = response.data;

      set_comp_error(jatt);
      if (response.status == 201) {
        setIsCompiled(true);
        setShowButtons(true);
        set_out1("Run the code");
        set_out2("Run the code");
        //compiiled
      }
      else {
        //compilation error
      }


    } catch (error) {
      set_comp_error(error);
      //alert(error);
    }
  };

  const run_test = async (t_id) => {
    try {
      const response = await axios.post('http://localhost:5000/run', {
        name: user_id,
        input: question.testcases[t_id].input,
        id: t_id.toString(),
      });
      if (response.status == 202) {
        //run time error
        return "Runtime Error"
      }
      else {
        return response.data;
      }
    } catch (error) {
      //network error
      return "Network Error"
    }
  };

  

  const run_handle = async () => {
    set_comp_error("");
    try {
      for (let i = 0; i < 3; i++) {
        run_test(i).then((out1) => {

          if (out1 == question.testcases[i].expectedOutput) {

          }

          if (i == 0) {
            set_out1(out1);
          }
          else if (i == 1) {
            set_out2(out1);
          }
          else {
            set_out3(out1);
          }

        });
      }
    } catch {

    }
  };

  const submit_the_Shit = async () => {
    try {
      const length = question.testcases.length;
      const promises = [];
  
      for (let i = 0; i < length; i++) {
        promises.push(run_test(i).then((out1) => {
          // alert(`${out1} : ${question.testcases[i].expectedOutput}`);
          if (out1 != question.testcases[i].expectedOutput) {
            if (out1 == "Runtime Error") {
              return 2;
            } else if (out1 == "Network Error") {
              return 3;
            } else {
              return 1;
            }
          } else {
            return 0;
          }
        }));
      }
  
      const results = await Promise.all(promises);
      const maxx = Math.max(...results, 0);
      //alert(`max is :  ${maxx}` );
      return maxx;
    } catch (error) {
      // Handle network error
      return 3;
    }
  };
  


  const submit_handle = async () => {
    try {
      const result =await submit_the_Shit();
      if(result==0){
        alert("Correct Soltuion")
      }
      else if(result==1){
        alert("Test case Failed")
      }
      else if(result==1){
        alert("RUNTIME ERROR")
      }
      else{
        alert("Network Error")
      }

     
    } catch {
      
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        <button id="btn1" className={activeTab === "codeEditor" ? "active" : ""} onClick={() => handleTabClick("codeEditor")}>Code</button>
        <button id="btn3" className={activeTab === "terminal" ? "active" : ""} onClick={() => handleTabClick("terminal")}>Terminal</button>
        <button id="btn2" className={activeTab === "solutionEditor" ? "active" : ""} onClick={() => handleTabClick("solutionEditor")}>Solution</button>
      </div>

      {activeTab === "codeEditor" && <div>
        <div className='code'>
          {/* Set the value of the textarea to the value stored in state */}
          <textarea rows={40} spellCheck={false} className='code_edit' value={code} onChange={handleCodeChange}></textarea>
        </div>
      </div>}

      {activeTab === "terminal" && <div>
        <div className='terminal'>
          {!showButtons && <button onClick={handleCompile} className='btns'>Compile</button>}
          {showButtons && <button onClick={run_handle} className='btns'>Run</button>}
          {showButtons && <button onClick={submit_handle} className='btns'>Submit</button>}
        </div>
        <div>

          {!showButtons && compilation_error!="compiled !" && <pre style={{ color: 'lightcoral' }}>{compilation_error}</pre>

}
          {showButtons && <div className='t_cases'>
            <div> <Test_case t_input={question.testcases[0].input} t_out={output_1} t_exp={question.testcases[0].expectedOutput} /> </div>
            <div> <Test_case t_input={question.testcases[1].input} t_out={output_2} t_exp={question.testcases[1].expectedOutput} /> </div>

          </div>}

        </div>
      </div>}

      {activeTab === "solutionEditor" && <div>
        <div className='soln'>
          <pre className='soln_text'>{question.solution}</pre>
        </div>
      </div>}

    </div>
  );
}

export default Right;
