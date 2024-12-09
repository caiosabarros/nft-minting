/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const path = require("path");
const app = express()
const session = require("express-session")
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const expressLayouts = require("express-ejs-layouts")
const walletRoute = require("./routes/walletRoute")
const utilities = require("./utilities/index")

/* ***********************
  * Middleware
  * ************************/
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'nameId',
  cookie: { secure: false } // TODO: set true when using Netlifly
}))

app.use(static)

app.use(utilities.connectMetamask)

/* ***********************
 * Routes
 *************************/

app.get("/", baseController.buildHome); // This renders the "views/index.ejs" file
app.get("/test", (req, res) => {
  res.render("index");  // No need to pass the layout since it's globally set
});
app.get("/wallet", walletRoute);



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

// Set the views directory and template engine
app.set("view engine", "ejs"); // Set EJS as the default template engine
app.set("views", path.join(__dirname, "views")); // Specify the "views" folder
app.use(expressLayouts)
app.set("layout", "layouts/layout") // not at views root

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
