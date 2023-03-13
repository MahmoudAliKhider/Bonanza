const express = require('express')
const app = express();


const port = 4000
app.listen(()=>{
    console.log(`server is running  http://localhost:${port}`)
})