var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/campolo", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res){
    res.render("landing");
});


// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // get all camgpgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campgrounds to database
app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   
   //create new campground and save to db
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});


// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Campolo Server Started!");
})