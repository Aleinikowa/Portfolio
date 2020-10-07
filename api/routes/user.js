const express = require('express'),
      router = express.Router(),
      config = require('config'),   
      fs = require('file-system');

router.post('/api/login', (req, res) => {
	const usersData = getDataFromDB(),
		userNew = req.body;

		usersData.push(userNew);
		setDataToDB(usersData);

	res.send(userNew)
});

router.put('/api/login/resume/:id', (req, res) => {
	const usersData = getDataFromDB(),
		userId = req.body;

	let user;

		if (userId.video) {
			user = usersData.find(user => user.id === userId.id);
			user.videoBlock = userId.video;
		}

		if (userId.cover) {
			user = usersData.find(user => user.id === userId.id);
			user.cover = userId.cover;
		}

		if (userId.avatar) {
			user = usersData.find(user => user.id === userId.id);
			user.avatar = userId.avatar;
		}

		if (userId.photo1) {
			user = usersData.find(user => user.id === userId.id);
			user.photo1 = userId.photo1;
		}

		if (userId.photo2) {
			user = usersData.find(user => user.id === userId.id);
			user.photo2 = userId.photo2;
		}

		if (userId.photo3) {
			user = usersData.find(user => user.id === userId.id);
			user.photo3 = userId.photo3;
		}

		if (userId.photo4) {
			user = usersData.find(user => user.id === userId.id);
			user.photo4 = userId.photo4;
		}

	setDataToDB(usersData);

	res.sendStatus(204);
});

router.post('/api/login/portfolio', (req, res) => {
	const usersData = getDataFromDB(),
		userNew = req.body;

	user = usersData.find(user => user.email == userNew.email);

	user ? res.send(user) : res.sendStatus(400);
});

router.get('/api/login/portfolio/:id', (req, res) => {
	const usersData = getDataFromDB(),
		user = usersData.find(user => user.id === req.params.id);

		user ? res.send(user) : res.send({});
});

router.post('/api/login/resume/:id', (req, res) => {
	const data = req.body,
		email = data.agentEmail,
		url = data.text,
		note = data.userNote; 

	let nodemailer = require('nodemailer'),
		transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'portfolio.rezume@gmail.com',
			pass: 'polina2474'
		}
	});
	
	let mailOptions = {
		from: 'portfolio.rezume@gmail.com',
		to: email,
		subject: 'My online resume',
		text: `Hello, I'm an artist and I'm interested in working with you. ${note}. Here is my resume ${url}`
	};
	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.res);
	  }
	});  

	res.send(data)
});

function getDataFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.data'), 'utf8'));
}

function setDataToDB(data) {
    fs.writeFileSync(config.get('database.data'), JSON.stringify(data));
}

module.exports = router;