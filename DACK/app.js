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
    danhsachdanhmuc=require('./controllers/quanlydanhmucController');

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
app.use('/quanliuser',quanlinguoidung);
app.use('/quanliyeucau',yeucau);
app.use('/quanlidanhmuc',danhsachdanhmuc);

app.listen(3000,function () {
    console.log('Ahii');
});