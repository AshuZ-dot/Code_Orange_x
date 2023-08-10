const express = require('express');
const router = express.Router();
const Question = require('../models/ques.js');
const { exec, execSync } = require('child_process');
const { spawn } = require('child_process');
const fs = require('fs');

router.route('/run').post(async(req, res) => {
    try{
        let f_name=req.body.name;
        let t_case=req.body.id;
        // console.log(f_name);
        // console.log(t_case);
        let input_f_name=f_name+"#"+t_case+".txt";
        f_name="./"+f_name;
        //console.log("function called");
        fs.writeFile(input_f_name,req.body.input, async (err) => {
            if (err){
              res.status(402).send("re run");
            }
            //input file created
      
            exec(`${f_name} < ${input_f_name}`, (err, stdout, stderr) => {
              if (err) {
                res.status(202).send("Runtime error");
                return ;
              }
              res.status(201).send(stdout);
              return ;
              
            });
        });

    }catch(err){
        res.status(500).json({ message: err.message });
        return ;
    }
});
module.exports = router;