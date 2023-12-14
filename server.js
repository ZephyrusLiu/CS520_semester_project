const express = require('express');
// const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// app.use(fileUpload());

// app.use(fileUpload({
// 	createParentPath: true
// }));

// Check if the user is authenticated by the system.
// checkAuthenticated = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	} else {
// 		res.status(401).redirect('../login.html');
// 	}
// };

app.get('/', function (req, res) {
	console.log(req.params);
	res.sendFile(__dirname + '/homepage.html');
});


// app.get('/login', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/login.html');
// });


// app.get('/signup', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/signup.html');
// });

// app.get('/user/add_health_info', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/add_health_info.html');
// });

// app.get('/user/add_medical_his', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/add_medical_his.html');
// });

// app.get('/user/add_personal_info', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/add_personal_info.html');
// });

// app.get('/user/dashboard', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/dashboard.html');
// });

// app.get('/user/view_all_patients', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/view_all_patients.html');
// });

// app.get('/user/view_health', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/view_health.html');
// });

// app.get('/user/view_personal', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/view_personal.html');
// });

// app.get('/user/view_treatment', function (req, res) {
// 	console.log(req.params);
// 	res.sendFile(__dirname + '/view_treatment.html');
// });


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
