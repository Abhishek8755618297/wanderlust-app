const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sessionOptions = {
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true
}

app.use(session(sessionOptions));
app.use(flash());

// app.get("/register", (req, res) => {
//     let { name = "anonymous"} = req.query; // ?Name=Shradha queryString
//     // console.log(req.session);
//     req.session.name = name;
//     // console.log(req.session.name);
//     req.flash("success", "user registered successfully");
//     res.redirect("/hello");
// });


// app.get("/hello", (req, res) => {
//     // console.log(req.flash("success"));
//     res.locals,messages = req.flash("success");
//     res.render("page.ejs", {name: req.session.name});
// });
//=> smane

//Middleware 
app.use((req, res, next) => {
    res.locals,successMsg = req.flash("success");
    res.locals,errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous"} = req.query; // ?Name=Shradha queryString
    req.session.name = name;
    
    if(name === "anonymous") {
        req.flash("error", "user not register");
    } else {
        req.flash("success", "user registered successfully");
    }
    res.redirect("/hello");
});


app.get("/hello", (req, res) => {

    res.render("page.ejs", {name: req.session.name});
});



// app.use(session({
//     secret: "mysupersecretstring", 
//     resave: false, 
//     saveUninitialized: true
// }));



// app.get("/requestcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successful!");
// });




// const cookieParser = require("cookie-parser");


// // app.use(cookieParser());
// app.use(cookieParser("secretcode"));

// //Signed cookies
// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "india", {signed: true});
//     res.send("signed coookies send");
// });

// //verified signed cookies
// app.get("/verify", (req, res) => {
//     // console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("verified");
// })


// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "namaste");
//     res.cookie("madeIn", "India");
//     res.send("send send you sum cookies !");
// })


// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);




app.listen(3000, () => {
    console.log("server is listening to 3000");
});

