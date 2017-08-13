var express = require('express');
var morgan = require('morgan');
var path = require('path');
const pool = require('pg');

var config = {
    user: 'agarwalvibhor84',
    database: 'agarwalvibhor84',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One | Vibhor Agarwal',
        heading: 'Article One',
        date: 'Aug 8, 2017',
        content: `
            <p>
                This is the content for my first article.This is the content for my first article.
                This is the content for my first article.This is the content for my first article.
            </p>
            <p>
                This is the content for my first article.This is the content for my first article.
                This is the content for my first article.This is the content for my first article.
            </p>
            <p>
                This is the content for my first article.This is the content for my first article.
                This is the content for my first article.This is the content for my first article.
            </p>`
    },
    'article-two': {
        title: 'Article Two | Vibhor Agarwal',
        heading: 'Article Two',
        date: 'Aug 10, 2017',
        content: `
            <p>
                This is the content for my second article.This is the content for my second article.
            </p>`
    },
    'article-three': {
        title: 'Article Three | Vibhor Agarwal',
        heading: 'Article Three',
        date: 'Aug 13, 2017',
        content: `
            <p>
                This is the content for my third article.This is the content for my third article.
            </p>`
    }
};
function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlContent = `<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-scale=1" /> 
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
        
        
    </html>
    `;
    return htmlContent;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
   //make a select request
   //return a response with the results
   pool.query('SELECT * FROM tets', function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }   else {
            res.send(JSON.stringify(result));
        }
   });
});

var counter = 0;
app.get('/counter', function(req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) {  //URL: /submit-name?name=xxx
    var name = req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));  //JSON format
});

app.get('/articles/:articleName', function(req, res) {
    // articleName == article-one
    //articles[articleName] == {} object for the articleOne
    
    pool.query("SELECT * FROM article WHERE title = " + req.params.articleName, function(err, res) {
        if(err) {
            res.status(500).send(err.toString());
        }  else {
            if( result.rows.length === 0) {
                res.status(404).send('Article not found');
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
