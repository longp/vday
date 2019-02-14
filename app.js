const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const path = require('path');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
console.log(publicPath)
app.get('/:name', async (req,res) => {
	let name = req.params.name
	res.render(publicPath +'/main', {
		name:name
	})
})

app.get("*", (req,res) => {
	res.render(publicPath +'/main', {
		name:''
	})
})

const server = app.listen(PORT, () => {
    console.log("listening on ", PORT);
});
