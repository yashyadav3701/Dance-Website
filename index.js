const express=require("express");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
mongoose.connect('mongodb://localhost:27017/contactUs', {useNewUrlParser: true, useUnifiedTopology: true});
const port=8000

// mongoose related stuff
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    address: String,
    more: String,
  });

  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static",express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// END POINTS
app.get("/",(req,res)=>{
    const syam={}
    res.status(200).render("home.pug",syam);
});

app.get("/contact",(req,res)=>{
    const syam={}
    res.status(202).render("contact.pug",syam);
});

app.post("/contact",(req,res)=>{
    let myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Data has been saved to database");
    }).catch(()=>{
        res.status(404).send("Data not saved to database");
    })
     // res.status(202).render("contact.pug",syam);
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`port running at ${port}`);
})