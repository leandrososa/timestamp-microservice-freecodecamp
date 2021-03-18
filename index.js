var express = require('express');
var app = express();
const port = 3000;

app.get('/', (req, res) => {
    //res.send('Hello Express')
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (req, res) => {
    res.send('holis');

    console.log(getTimestamp());
    console.log(getTimestamp('2015-03-03'));
});

function getTimestamp(date = new Date){
    return Math.floor(date.getTime() / 1000)
}




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})