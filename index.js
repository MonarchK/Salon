require('dotenv').config();
const cloudinary = require('cloudinary').v2;//import { v2 as cloudinary } from 'cloudinary';
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const homePage = require('./controllers/homePage');
const aboutPage = require('./controllers/aboutPage');
const servicesPage = require('./controllers/servicesPage');
const shopPage = require('./controllers/shopPage');
const contactPage = require('./controllers/contactPage');
const addServicesPage = require('./controllers/addServicesPage');
const addServices = require('./controllers/addServices');
const addUserPage = require('./controllers/addUserPage');
const addUser = require('./controllers/addUser');
const loginPage = require('./controllers/loginPage');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const flash = require('express-flash');
const authMiddleware = require('./controllers/authMiddleware');
const addItemPage = require('./controllers/addItemPage');
const addItem = require('./controllers/addItem');
const updateItemPage = require('./controllers/updateItemPage');
const updateItem = require('./controllers/updateItem');
const updateServicePage = require('./controllers/updateServicePage');
const updateService = require('./controllers/updateService');
const deleteService = require('./controllers/deleteService');
const deleteItem = require('./controllers/deleteItem');
const displayWarning = require('./controllers/displayWarning');
const notFoundPage = require('./controllers/notFoundPage');


const app = express();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB connected successfully');
}).catch(error=>{
    console.log(console.error);
    return window.location.href = '/';
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressFileUpload({
    useTempFiles: true, // Save files to disk
    tempFileDir: '/tmp/', // Temporary directory
}));
app.use(expressSession({
    store: mongoStore.create({mongoUrl: process.env.MONGODB_URL}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //change to true if using https
        maxAge: 60 * 60 * 1000 //1hr in millisecs
    } 
}));
app.use(flash());
app.use('*', (req,res,next)=>{
    res.locals.login = req.session.userId;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
cloudinary.config({ 
    cloud_name: 'djyq4h3t5', 
    api_key: '926355155787617', 
    api_secret: process.env.API_SECRET
});
app.set('view engine', 'ejs');

app.listen(process.env.PORT, ()=>{
    console.log('App listening');
});

app.get('/', homePage);

app.get('/about', aboutPage);

app.get('/services', servicesPage);

app.get('/services/:emp', authMiddleware, updateServicePage);

app.post('/services/:emp', authMiddleware, updateService);

app.get('/del/services/:emp', authMiddleware, deleteService);

app.get ('/displayWarning/:emp', authMiddleware, displayWarning);

app.get('/shop', shopPage);

app.get('/shop/:emp', authMiddleware, updateItemPage);

app.post('/shop/:emp', authMiddleware, updateItem);

app.get('/del/shop/:emp', authMiddleware, deleteItem);

app.get('/contact', contactPage);

app.get('/service/new', authMiddleware, addServicesPage);

app.post('/service/store', authMiddleware, addServices);

app.get('/user/new', authMiddleware, addUserPage);

app.post('/user/store', authMiddleware, addUser);

app.get('/auth/login', loginPage);

app.post('/user/login', login);

app.get('/auth/logout', authMiddleware, logout);

app.get('/item/new', authMiddleware, addItemPage);

app.post('/item/store', authMiddleware, addItem);

app.get('*', notFoundPage);
