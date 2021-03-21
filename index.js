var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/', (req, res) => {

    console.log(message(req.ip));

    let date = new Date();
    json = { unix: getTimestamp(date), utc: date.toUTCString() };

    res.json(json)
});

app.get('/api/timestamp/:date', (req, res) => {
    //console.log(message(req.ip));

    
    let dateString = req.params.date;
    let json;
    console.log("\x1b[31m", 'Solicited date: ' + dateString);
    
    if (/\d{5,}/.test(dateString)){
        let int = parseInt(dateString);
        json = { unix: int, utc: getUTCDate(int).toUTCString() }
    } else {
        let timestamp = getTimestamp(new Date(dateString));

        console.log(timestamp.toString());

        if (isNaN(timestamp.toString())) {
            json = { error: "Invalid Date" };
          } else {
            json = { unix: timestamp, utc: new Date(dateString).toUTCString() }
          }

        
    }

    /* try{
        if(req.params.date.indexOf('-') > -1){
            let timestamp = getTimestamp(new Date(req.params.date));
            json = { 'unix': timestamp, 'utc': new Date(req.params.date).toUTCString() }
        }else{
            let int = parseInt(req.params.date);
            json = { 'unix': int, 'utc': getUTCDate(int).toUTCString() }
        }

    } catch(err) {
        json = '';
        json = { error : "Invalid Date" }
    } */



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