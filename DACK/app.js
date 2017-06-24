var express = require('express'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    wnumb = require('wnumb'),
    handle404 = require('./middle-wares/handle-404'),
    handleLayout=require('./middle-wares/handleLayout'),
    index= require('./controllers/indexController'),
    quanlinguoidung=require('./controllers/danhsachnguoidungController'),
    yeucau=require('./controllers/yeucauController'),
    huongdan=require('./controllers/huongdanController'),
    danhsachdanhmuc=require('./controllers/quanlydanhmucController'),
    dangky=require('./controllers/dangkyController');


var app = express();

app.use(morgan('dev'));

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    partialsDir: 'views/_partials/',
     helpers: {
         section: handlebars_sections(),
         number_format: function (n) {
             var nf = wnumb({
                 thousand: ','
             });
             return nf.to(n);
         }
     }
}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(handleLayout);
app.use('/', index);
app.post('/taikhoan/dangky',function(req,res){
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // Put your secret key here.
    var secretKey = "6LcvtSYUAAAAANYxlkp95Gns6wBKcxgcBc-k0gYJ";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
    });
});
app.use('/quanliuser',quanlinguoidung);
app.use('/quanliyeucau',yeucau);
app.use('/quanlidanhmuc',danhsachdanhmuc);
app.use('/huongdan',huongdan);
app.use('/taikhoan/dangky',dangky);
app.use(handle404);

app.listen(3000,function () {
    console.log('Ahii');
});