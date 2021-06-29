require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/shorturl/1",(req,res) =>  {
  const savedURL= req.app.locals.url;
  console.log(savedURL);
  res.redirect(savedURL.href);
});

app.post("/api/shorturl",(req,res) =>  {
  console.log("request body: "+req.body.url);
  try  {
  const inputURL= new URL(req.body.url);
  console.log(inputURL);
  app.locals.url=inputURL;
  res.json({original_url:inputURL,short_url:newURL});
  }catch(e)  {
    res.json({error:"invalid url"});
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
