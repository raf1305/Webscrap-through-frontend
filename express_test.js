const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const spawnSync = require("child_process").spawnSync;

app.set('view engine', 'pug');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 80;
const fs = require('fs')
const filecontent = fs.readFileSync('tut8.html')
app.get("/", (req, res) => {
    res.status(200).end(filecontent);
});


app.post("/submit", (req, res) => {
    console.log(req.body)
    let search=req.body.myName.toString()
    let limit=parseInt(req.body.number);
    console.log(search)
    console.log(limit)
    let va=[[]]
    let process = spawnSync('python3',["./starter.py",search,limit] );
    let str1=process.output.toString();
    console.log(str1)
    str1 = str1.split('\n');
    console.log(str1)
    for(i=0;i<limit;i++){
        //console.log(`${process.output}`);
        let process2=spawnSync('python3',["./hello.py",i]);
        const str=process2.output.toString();
        const words = str.split(',');
        console.log(words[1]);
        console.log(words[2]);
        console.log(words[3]);
        va[i]=words;
    }
    const params={'va':va};
    res.status(200).render('index.pug',params);

});


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
