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
// app.get("/", (req, res)=>{ 
//     res.status(200).send("This is homepage of my first express app with Harry");
// });
// app.get("/submit", (req, res)=>{
//     res.send("This is about page of my first express app with Harry");
// });

app.post("/submit", (req, res) => {
    console.log(req.body)
    let search=req.body.myName
    let limit=parseInt(req.body.number);
    console.log(typeof limit);
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


    //res.end("This is about page of my first express app with Harry");
    // let i=0;
    // let bb=[]

    // res.write(`${process.output}`);
    // // process.stdout.on('data', function(data) { 
    // //     //res.write(`<h1>${data.toString()}<h1>`);
    // //     bb.push(data);
    // //     console.log(`${data}`);
    // //     // var d=data.toString();
    // //     //res.write(data.toString());
    // //     //res.write(`${data}`);
    // // })
    // //console.log(bb);
    // console.log(i)
    // //res.write(`<h1>This is a post request about ${i} page of my first express app with Harry<h1>`);
    // //res.write(`<h1>${d}<h1>`);

    // }  
    // res.end();
});
// app.get("/this", (req, res)=>{
//     res.status(404).send("This page is not found on my website cwh");
// });

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
