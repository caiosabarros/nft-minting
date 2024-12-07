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
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")

/* ***********************
 * Routes
 *************************/
app.use(static)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

// Set the views directory and template engine
app.set("views", path.join(__dirname, "views")); // Specify the "views" folder
app.set("view engine", "ejs"); // Set EJS as the default template engine
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

// Route for the home page
app.get("/", (req, res) => {
  res.render("index"); // This renders the "views/index.ejs" file
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
