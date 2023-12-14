const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(fileUpload({
	createParentPath: true
}));

// Check if the user is authenticated by the system.
checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).redirect('../login.html');
	}
};

app.get('/', function (req, res) {
	console.log(req.params);
	res.sendFile(__dirname + '/homepage.html');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
