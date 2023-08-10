const router = require('express').Router();
const { exec } = require('child_process');

const fs = require('fs');

router.route('/compile').post((req, res) => {
    
    
    const base64Data = req.body.data;
    //let user_name=req.body.name;
    
    const bufferData = Buffer.from(base64Data, 'base64');
    const utf8Data = bufferData.toString('utf-8');
    //console.log(utf8Data);
    fs.writeFile('hello.cpp',utf8Data, (err) => {
        if (err){
          res.status(402).send("recompie");
          return ;
        }
        //console.log('File created!');
        exec('g++ hello.cpp', (err, stdout, stderr) => {
          if (err) {
            //console.log(stderr);
            const lines = stderr.split('\n').slice(0, 8);
            const first8Lines = lines.join('\n');
            //console.log(first8Lines);
            res.status(202).send(first8Lines);
            return; 
          }
          res.status(201).send("compiled !");
          return;

        });
        return;
      });
      return;
    // Do something with the bufferData...
    res.send('OK');
});
module.exports = router;