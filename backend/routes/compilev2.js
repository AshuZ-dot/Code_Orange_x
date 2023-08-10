const router = require('express').Router();
const { exec } = require('child_process');

const fs = require('fs');

router.route('/compile').post(async (req, res) => {
    try {
        let f_name=req.body.name;
        let cpp_name=f_name+".cpp";
        fs.writeFile(cpp_name,req.body.code, async (err) => {
            if (err){
              res.status(402).send("recompie");
      
              return ;
            }
            //console.log('File created!');
      
            await exec(`g++ ${cpp_name} -o ${f_name}`, (err, stdout, stderr) => {
              if (err) {
            
                const lines = stderr.split('\n').slice(0, 8);
                const first8Lines = lines.join('\n');
                //console.log(first8Lines);
                res.status(202).send(first8Lines);
                return; 
              }
              res.status(201).send("compiled !");
              
      
            });
        });

    }catch (err) {
        // Send an error response if there is an error saving the question to the database
        // res.status(500).json({ message: err.message });
    }
});
module.exports = router;