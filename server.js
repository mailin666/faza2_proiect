var express= require("express");
var Sequelize=require("sequelize");
var nodeadmin = require("nodeadmin");
var app = express();

app.use(express.static('fisier'))

app.use('/nodeamin', nodeadmin(app));
app.use(express.json());       
app.use(express.urlencoded()); 

var sequelize=new Sequelize('ArtStud', 'root','',{ 
     dialect:'mysql',
     host:'localhost'
 });

sequelize.authenticate().then(function(){console.log('Succes');}).catch(function(){console.log('Eroare');})


var Utilizatori = sequelize.define('users', {
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING,
    numeUtilizator: Sequelize.STRING,
    email: Sequelize.STRING,
    parola: Sequelize.STRING,
    descriere: Sequelize.STRING
})

var Imagini = sequelize.define('images', {
    id_categorie: Sequelize.INTEGER,
    id_utilizator: Sequelize.INTEGER,
    titlu: Sequelize.STRING,
    descriere: Sequelize.STRING,
    url: Sequelize.STRING
})

var Mesaje = sequelize.define('messages', {
    id_utilizator: Sequelize.INTEGER,
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING,
    usernameDestinatar: Sequelize.STRING,
    subiect: Sequelize.STRING,
    continut: Sequelize.STRING,
    email: Sequelize.STRING,
    telefon: Sequelize.INTEGER
})
var Categori = sequelize.define('categories', {
    nume: Sequelize.STRING,
    descriere: Sequelize.STRING
})

Imagini.belongsTo(Categori, {foreignKey: 'id_categorie', targetKey: 'id'})
Imagini.belongsTo(Utilizatori, {foreignKey: 'id_utilizator', targetKey: 'id'});
Utilizatori.hasMany(Mesaje, {foreignKey: 'id_utilizator', targetKey: 'id'});

app.get('/categories', function(request, response) {
    Categori.findAll().then(function(categories){
        response.status(200).send(categories)
    })
})

app.post('/categories', function(request, response) {
    Categori.create(request.body).then(function(categories) {
        response.status(201).send(categories)
    })
})

// get one category by id
app.get('/categories/:id', function(request, response) {
    Categori.findOne({where: {id:request.params.id}}).then(function(categories) {
        if(categories) {
            response.status(200).send(categories)
        } else {
            response.status(404).send()
        }
    })
})


app.get('/users', function(request, response) {
    Utilizatori.findAll().then(function(users){
        response.status(200).send(users)
    })
})

app.get('/images', function(request, response) {
    Imagini.findAll().then(function(images){
        response.status(200).send(images)
    })
})

app.get('/messages', function(request, response) {
    Mesaje.findAll().then(function(messages){
        response.status(200).send(messages)
    })
})

app.listen(8080);