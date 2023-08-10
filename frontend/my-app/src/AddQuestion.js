import React, { useState } from 'react';
import axios from 'axios';

function AddQuestion() {
  const [ques_id, setQuesId] = useState('');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState('');
  const [testcases, setTestcases] = useState([{ input: '', expectedOutput: '' }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a new question object
      const newQuestion = {
        ques_id: parseInt(ques_id),
        name,
        question: btoa(question),
        solution: btoa(solution),
        testcases: testcases.map((testcase) => ({
          input: btoa(testcase.input),
          expectedOutput: btoa(testcase.expectedOutput)
        }))
      };

      // Send the question data to the API
      const response = await axios.post('http://localhost:5000/add_ques', newQuestion);

      // Log the response from the API
      console.log(response.data);

      // Reset the form fields
      setQuesId('');
      setName('');
      setQuestion('');
      setSolution('');
      setTestcases([{ input: '', expectedOutput: '' }]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTestcase = () => {
    setTestcases([...testcases, { input: '', expectedOutput: '' }]);
  };

  const handleTestcaseInputChange = (index, event) => {
    const newTestcases = [...testcases];
    newTestcases[index].input = event.target.value;
    setTestcases(newTestcases);
  };

  const handleTestcaseExpectedOutputChange = (index, event) => {
    const newTestcases = [...testcases];
    newTestcases[index].expectedOutput = event.target.value;
    setTestcases(newTestcases);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question ID:
        <input type="number" value={ques_id} onChange={(e) => setQuesId(e.target.value)} required />
      </label>
      <br />
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Question:
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </label>
      <br />
      <label>
        Solution:
        <textarea value={solution} onChange={(e) => setSolution(e.target.value)} required />
      </label>
      <br />
      {testcases.map((testcase, index) => (
        <div key={index}>
          <label>
            Testcase Input:
            <textarea value={testcase.input} onChange={(e) => handleTestcaseInputChange(index, e)} required />
          </label>
          <br />
          <label>
            Expected Output:
            <textarea
              value={testcase.expectedOutput}
              onChange={(e) => handleTestcaseExpectedOutputChange(index, e)}
              required
            />
          </label>
          <br />
        </div>
      ))}
      <button type="button" onClick={handleAddTestcase}>
        Add Testcase
      </button>
      <br />
      <button type="submit">Add Question</button>
    </form>
  );
}


export default AddQuestion;
