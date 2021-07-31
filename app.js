const express = require('express')
const mongoose = require('mongoose')
const db = require("./models/User.js")

const passport = require('passport')

const app = express()
const PORT = 80
const DB_URL = 'mongodb+srv://user2:123@cluster0.75igq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.use(new VKontakteStrategy({
	    clientID:     '7915573',
	    clientSecret: '5QWwWZUR1QySEViAy51m',
	    callbackURL:  "http://website.ru/auth/vkontakte/callback"
	  },
	  function(accessToken, refreshToken, params, profile, done) {
	    return done(null, profile);
	  }
	));

app.use(express.json())

app.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
  });

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { 
    failureRedirect: '/login',
    session: false
   }),
  function(req, res) {
    res.send(req.user);
  });


async function startApp() {
	try {
		await mongoose.connect(DB_URL, 
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
			
		app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
	} catch {
		console.log(e)
	}
}

function CreateDB() {
	db.create(
		{
			nickname: "Tom", 
			idvk: 34,
			ads: 0,
			balance: 0
		}, 
		function(err, doc){
	    	mongoose.disconnect();
	      
	    	if(err) return console.log(err);
	      
	    	console.log("Сохранен объект", doc);
	});
}





startApp()



