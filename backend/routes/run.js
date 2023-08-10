const router = require('express').Router();
const { exec } = require('child_process');

const fs = require('fs');

router.route('/run').post((req, res) => {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
      fs.writeFile('input.txt', body, (err) => {
        if (err){
          res.status(403).send("input error");
          return ;
        }
        //console.log('File created!');
        exec('./a.out < input.txt', (err, stdout, stderr) => {
          if (err) {
            res.status(404).send(stderr);
            return; 
          }
          res.status(202).send(stdout);
          return;

        });
        return;
      });
      return;
    });
    return ;
});
module.exports = router;