const express = require('express');
// path is npde inbuilt module
const path = require('path');
// it is use when we use partials in hbs engine and // for installing hbs engine we use (npm i hbs) in command prompt
const hbs = require('hbs')
const app = express();
// routing port // process.env.PORT using in development time because these time 8000 port is not work 
const port = process.env.PORT || 8000;


// public static path
const staticPath = path.join(__dirname, "../public")
// templates path for views in hbs
const templatesPath = path.join(__dirname, "../templates/views")
// template path for partials in hbs
const paritalsPath = path.join(__dirname, "../templates/partials")


// static page ko route krne ka trika
app.use(express.static(staticPath));
// for setting the hbs engine this is work when we only use views without partials
app.set('view engine', 'hbs');
// this is for partials because we use templates in hbs
app.set('views', templatesPath);
// now we indiacate the partials
hbs.registerPartials(paritalsPath)


// when we use hbs so if we use nodemon so we restart the nodemone with this (nodemon src/app.js -e js,hbs) from this we can recorgnize both kind of files
// Routing
app.get("", (req,res)=> {
    // when we use hbs engine we use res.render // and normally we use res.send
    res.render("index.hbs")
})

app.get("/about", (req,res)=> {
    res.render("about.hbs")
})

app.get("/weather", (req,res)=> {
    res.render("weather.hbs")
})

// this is for error 404 page. it is define at the end of routing
app.get("*", (req,res)=> {
    res.render("404error.hbs")
})

// listening is very important to routing in express
app.listen(port, () =>{
    console.log(`listening to the port at ${port}`);
})