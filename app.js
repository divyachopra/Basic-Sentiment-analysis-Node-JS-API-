var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

var express = require('express');


var app = express();
app.listen(3000,listening);

app.get('/all', sendAll);

function sendAll(request, response){

    response.send(words);
}

function listening() {
  console.log("listening...");
}



app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;

    if (!score) {
        reply = {
            msg: "Score is required."
        }
        response.send(reply);
    }
    else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile('words.json',data, finished);
    function finished(err){
        console.log('all set.');
         reply = {
            "word": word,
            "score": score,
            "status": "Thank you for your word."
        }
        response.send(reply);
    }

    }

}


app.get('/search/:word/', searchword);

function searchword(request, response){
    var word = request.params.word;
    var reply;
    if(words[word])
    {
        reply={
            msg: "Word exists",
            word: word,
            score: words[word]
    }
    }
    else
    {
        reply={
            msg:"Word doesn't exists",
            word: word
    }
    }

    response.send(reply);
}