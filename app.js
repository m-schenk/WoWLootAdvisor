const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const Discord = require('discord.js');

require("dotenv").config();

const discordRouter = require('./routes/discord')
const playerRouter = require('./routes/player');
const itemsRouter = require('./routes/items');
const wishlistRouter = require('./routes/wishlist');

const discordStrategy = require('./strategies/discordStrategies');

const app = express();

const client = new Discord.Client();
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 3600000
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

console.log(process.env.NODE_ENV);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'react-spa/build/')));
app.use(express.static(path.join(__dirname, 'react-spa/build/static')));

// api routes
app.use('/api/discord', discordRouter);
app.use('/api/player', playerRouter);
app.use('/api/items', itemsRouter);
app.use('/api/wishlist', wishlistRouter);

// catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    next(createError(404));
});

// front-end, every request should be resovled in react router if call is not to api endpoint
app.get('*', (req, res) => {
    console.log('route: *')
    res.sendFile(path.join(__dirname+'/react-spa/build/index.html'));
});

// error handler
app.use(function (err, req, res, next) {

    //log error to console
    console.error(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.statusCode || 500);
    res.render('error');
});

// set both mongoose major update flags
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        console.log('successfully connected to db!');
    })
    .catch(err => {
        console.log(err);
        process.exit(0);
    })

module.exports = app;
