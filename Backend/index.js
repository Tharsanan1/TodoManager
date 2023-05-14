const express = require('express')
const cors = require('cors');
const app = express()
const port = 8081
app.use(cors());
app.get('/todo', (req, res) => {
  res.send([{"taskName": "wprld", "taskDescription" : "bsdhgfgwdfa hioahf hf ah fohas ofhaoif f iodf io fs iofhaoisdfgads fof s fa hsofgaiusgfi agfg iugfuaigf iasfgiuguigfiu fdaiuf iugfui", status: "InProgress"},
    { "taskName": "fdsfsdfsdfdfds", "taskDescription": "bsdhgfgwdf io fs iofhaoisdfgads fof s fa hsofgaiusgfi agfg iugfuaigf iasfgiuguigfiu fdaiuf iugfui", status: "Done" },
    { "taskName": "fdsfsdfsdfdfds", "taskDescription": "bsdhgfgwdf io fs iofhaoisdfgads fof s fa hsofgaiusgfi agfg iugfuaigf iasfgiuguigfiu fdaiuf iugfui", status: "Todo" }])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})