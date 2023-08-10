const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const multer = require('multer');
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.listen(port, () => {
    console.log('Servidor rodando')
})


//Carregando o cabeçalho do html em outras paginas
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//arquivos estaticos
app.use('/public', express.static('public/css'));

//Rota principal
app.get('/', function(req, res){
    //o then passa os posts para a nossa view
    Post.findAll().then(function(posts){
        //var nposts = JSON.parse(JSON.stringify(posts));
        //res.render('home', {posts: posts})
        posts=posts.map((post)=>{return post.toJSON()});
        res.render('home', {posts: posts})
    });
});

//Rota para o cadastro
app.get('/cad', function(req, res){
    res.render('formulario');
});

//Exclusão no banco
app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).
    then(function(){
        res.redirect('/');
    }).catch(function(error){
        res.send('Houve um erro com essa postagem: '+erro);
    });
});

//Rota para Alterar
app.get('/alterar/:id', function(req, res){
    Post.findAll({where: {'id': req.params.id}}).then(function(posts){
        //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})
        posts=posts.map((post)=>{return post.toJSON()});
        res.render('alterar', {posts: posts})
    });
});

//Inserção no banco
app.post('/add', upload.single('img'), function(req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        img: req.file.filename
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.send('Houve um erro: ' + erro);
    });
});

//Alteração no banco
app.post('/update', upload.single('img'), function(req, res){
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        img: req.file ? req.file.filename : undefined
    },{
        where: {id: req.body.id}
    }).then(function(){
        res.redirect('/');
    }).catch(function(erro){
        res.send('Houve um erro com essa postagem: '+erro);
    });
});

app.listen(8081, function(){
    console.log('Servidor rodando na porta 8081');
});

app.use('/img/', express.static('img/'));