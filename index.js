var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (req, res) => {

    console.log(message(req.ip));

    let date = new Date();
    json = { 'unix': getTimestamp(date), 'utc': date.toUTCString() };

    res.json(json)
});

app.get('/api/timestamp/:date', (req, res) => {
    console.log(message(req.ip));
    let json;

    try{
        if(req.params.date.indexOf('-') > -1){
            let timestamp = getTimestamp(new Date(req.params.date));
            json = { 'unix': timestamp, 'utc': new Date(req.params.date).toUTCString() }
        }else{
            let int = parseInt(req.params.date);
            json = { 'unix': int, 'utc': getUTCDate(int).toUTCString() }
        }

    } catch(err) {
        json = { error : "Invalid Date" }
    }

    res.json(json)
});

function getTimestamp(date){
    return date.getTime()
}

function getUTCDate(timestamp){
    return new Date(timestamp);
}

function message(ip){
    return `Nueva llamada desde ${ip}`;
}


app.listen(port, () => {
    console.log(`Aplicacion ejecutandose en http://localhost:${port}`)
})