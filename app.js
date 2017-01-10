var words = {
    "rainbow":5,
    "unicorn":6,
    "doom": -3,
    "gloom": -2
}



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
    }
    else {
    words[word] = score;

    var reply = {
        msg: "Thank you for your word."
    }
    }
    response.send(reply.msg);
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