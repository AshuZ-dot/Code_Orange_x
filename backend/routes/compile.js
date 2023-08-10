const router = require('express').Router();
const { exec } = require('child_process');

const fs = require('fs');

router.route('/compile').post((req, res) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
      fs.writeFile('hello.cpp', body, (err) => {
        if (err){
          res.status(402).send("recompie");
          return ;
        }
        //console.log('File created!');
        exec('g++ hello.cpp', (err, stdout, stderr) => {
          if (err) {
            res.status(401).send(stderr);
            return; 
          }
          res.status(201).send("compiled !");
          return;

        });
        return;
      });
      return;
    });
    return ;
});
module.exports = router;