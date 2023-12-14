const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	console.log(req.params);
	res.sendFile(__dirname + '/dashboard.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
