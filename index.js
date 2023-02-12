const express = require("express");
const routers = require('./routes')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
const app = express();
app.use(routers);


app.listen(3000, () => console.log("Server is listening on port 3000 ..."))