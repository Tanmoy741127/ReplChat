require('dotenv').config();

const PORT = parseInt(process.env.PORT);
const DEBUG = parseInt(process.env.DEBUG);

// Express
const express = require('express');
const app = express();

// Cookie parser
var cookieParser = require('cookie-parser');

// Config
global.__basedir = __dirname;
app.disable('x-powered-by')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set logger
if(DEBUG == 1) {
    var morgan = require('morgan');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

// Middleware
const {AuthMiddleware} = require("./middleware");

app.use(AuthMiddleware.resolveUser);

// Route
app.use("/auth", require("./routes/auth.route"));


// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Unexpected Error" });
})

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));