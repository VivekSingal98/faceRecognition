const express = require('express');
const bodyParser= require('body-parser');
const app= express();
const cors=require('cors');

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: '1',
			password: '1',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}


app.get('/',(req, res)=> {
	res.send('this is working');
})

app.post('/register',(req,res) => {
	const {name, email, password}=req.body;
	database.users.push({
		id: '123',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()	
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const {id}=req.params;
	database.users.forEach(user => {
		if(user.id===id) {
			return res.json(user);
		}
	})
	return res.status(400).json("Not found");
})
app.post('/image', (req,res) => {
	//const {id}=req.body
	database.users.forEach(user => {	
		return res.json(req.body.id);
		if(user.id === id) {
			user.entries++;
			return res.json(user.entries);
		}
	})
	return res.status(400).json("Not image found");
})

app.post('/signin',(req,res) => {
	if(req.body.email===database.users[0].email || req.body.password===database.users[0].password) {
		res.json(database.users[0]);
	}
	else {
		res.status(400).json("not found");
	}

})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})