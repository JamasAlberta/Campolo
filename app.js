var express = require("express");
var app = express();
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
            {
                name: "Byron Bay", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"
            },
            {
                name: "Tamborine Mountain", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"
            },
            {
                name: "Sunshine Coast", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"
            }
       ];
       
       res.render("campgrounds", {campgrounds: campgrounds});
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Campolo Server Started!");
})