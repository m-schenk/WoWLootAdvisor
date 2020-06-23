const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = process.env.PORT || "8000";


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const adminRoutes = require('./routes/admin');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('root');
    next();
});

app.use(adminRoutes);




app.listen(port, () => {
  console.log('Listening to requests on http://localhost:${port}');
});



