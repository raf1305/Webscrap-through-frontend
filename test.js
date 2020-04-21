const spawnSync = require("child_process").spawnSync;
let process = spawnSync('python3',["./starter.py",'coronavirus','5'] );
let str1=process.output.toString();
console.log(str1)