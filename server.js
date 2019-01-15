var express= require("express");
var Sequelize=require("sequelize");
var nodeadmin = require("nodeadmin");
var cors = require('cors');
var axios=require("axios");
var app = express();
app.use(cors())
const APIKey = '99d6f6f156afa576f5eb831d7089691bf534add70d1d47330b'
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.use('/',express.static('frontend/build'))
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
var Categorii = sequelize.define('categories', {
    nume: Sequelize.STRING,
    descriere: Sequelize.STRING
})

Imagini.belongsTo(Categorii, {foreignKey: 'id_categorie', targetKey: 'id'})
Imagini.belongsTo(Utilizatori, {foreignKey: 'id_utilizator', targetKey: 'id'});
Utilizatori.hasMany(Mesaje, {foreignKey: 'id_utilizator', targetKey: 'id'});



app.post('/categories', function(request, response) {
    Categorii.create(request.body).then(function(categories) {
        if(categories){
        response.status(201).send(categories)
     }else {
            response.status(404).send('Eroare la adaugare!')
           }
    })
})

app.post('/postuser', function(request,response){
      Utilizatori.create(request.body).then(function(utilizatori){
        if(utilizatori){
            response.status(201).send(utilizatori)
        }else{
            response.status(404).send('Eroare la adaugare!')
        }
        
    })
    
})

app.post('/mesaje',function(request, response) {
      Mesaje.create(request.body).then(function(mesaje){
        if(mesaje){
            response.status(201).send(mesaje)
        }else{
            response.status(404).send('Eroare la adaugare!')
        }
    })
})

app.post('/imagini',function(request, response) {
      Imagini.create(request.body).then(function(imagini){
        if(imagini){
            response.status(201).send(imagini)
        }else{
            response.status(404).send('Eroare la adaugare!')
        }
    })    
})


app.get('/categorii', function(request, response) {
    Categorii.findAll().then(function(categorii){
        if(categorii){
            response.status(201).send(categorii)
        }else{
            response.status(404).send('Eroare la regasire!')
        }
    })
})




app.get('/categorie/:id', function(request, response) {
    Categorii.findOne({where: {id:request.params.id}}).then(function(categorie) {
        if(categorie) {
            response.status(201).send(categorie)
        }else{
            response.status(404).send("Nu exista categorie cu id-ul specificat!")
        }
    })
})


app.get('/utilizatori', function(request, response) {
     Utilizatori.findAll().then(function(utilizatori){
         if(utilizatori){
              response.status(201).send(utilizatori)
        }else{
              response.status(404).send('Eroare la regasire!')
        }
    })
})

app.get("/users",async function(request,response){
    try{
         let users= await Utilizatori.findAll();
         let no_users=users.length;
         response.status(200).json(users);
         console.log("Exista "+ no_users +" utilizatori");
   
    }catch(error){
         response.status(404).send(error.message);
    }
});

app.get('/users/:email',(request,response)=>{
   Utilizatori.findAll({where: {email: request.params.email}}).then((users)=>{
       response.status(200).json(users)
   }).catch((ex)=>{
        console.log(ex)
    })
})

app.post('/users',(request,response)=>{
    Utilizatori.create(request.body).then((user)=>{
        response.status(201).json(user)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/deviantArt/:username',function(request, response) {
    axios.get('https://www.deviantart.com/api/v1/oauth2/user/profile/'+request.params.title+'?ext_collections=1&ext_galleries=1&access_token='+APIKey).then((books)=>{
        response.status(200).json(books.data)
    }).catch((ex)=>{
        console.log(ex)
    })
})

app.get('/utilizator/:id',function(request, response) {
    Utilizatori.findOne({where:{id:request.params.id}}).then(function(utilizator){
        if(utilizator){
            response.status(201).send(utilizator)
        }else{
            response.status(404).send('Nu exista utilizatorul cu id-ul specificat')
        }
    })
})
app.get('/imagini', function(request, response) {
    Imagini.findAll().then(function(imagini){
        if(imagini){
            response.status(201).send(imagini)
        }else{
            response.status(404).send('Eroare la regasire!')
        }
    })
})



app.get('/imagine/:id',function(request, response) {
    Imagini.findOne({where:{id:request.params.id}}).then(function(imagine){
        if(imagine){
            response.status(201).send(imagine)
        }else{
            response.status(404).send('Nu exista imagine cu id-ul specificat')
        }
    })
})


app.get('/mesaj/:id',function(request, response) {
    Mesaje.findOne({where:{id:request.params.id}}).then(function(mesaj){
        if(mesaj){
            response.status(201).send(mesaj)
        }else{
            response.status(404).send('Nu exista mesaj cu id-ul specificat')
        }
    })
})

app.get('/mesaje', function(request, response) {
    Mesaje.findAll().then(function(mesaje){
        if(mesaje){
            response.status(201).send(mesaje)
        }else{
            response.status(404).send('Nu au fost adaugate mesaje')
        }
    })
})

app.put('/categorie/:id', (request, response) => {
    Categorii.findById(request.params.id).then((categorie) => {
        if(categorie){
            categorie.update(request.body).then((rezultat) =>{
                   response.status(201).json(rezultat)
            }).catch((err) =>{
                   console.log(err)
                   response.status(500).send('Eroare la actualizare!')
            })
        }else {
            response.status(404).send('Sursa nu exista!')
        }
    }).catch((err) => {
            console.log(err)
            response.status(500).send('Eroare la nivelul bazei de date')
    })
})


app.put('/utilizator/:id', (request, response) => {
    Utilizatori.findById(request.params.id).then((utilizator) => {
        if(utilizator) {
            utilizator.update(request.body).then((rezultat) => {
                  response.status(201).json(rezultat)
            }).catch((err) => {
                  console.log(err)
                  response.status(500).send('Eroare la actualizare!')
            })
        }else {
             response.status(404).send('Sursa nu exista!')
        }
    }).catch((err) => {
            console.log(err)
            response.status(500).send('Eroare la nivelul bazei de date')
    })
})

app.put('/imagine/:id', (request, response) => {
    Imagini.findById(request.params.id).then((imagine) => {
        if(imagine) {
            imagine.update(request.body).then((rezultat) => {
                response.status(201).json(rezultat)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Eroare la actualizare!')
            })
        } else {
                response.status(404).send('Sursa nu exista!')
        }
    }).catch((err) => {
               console.log(err)
               response.status(500).send('Eroare la nivelul bazei de date')
    })
})

app.put('/mesaj/:id', (request, response) => {
    Mesaje.findById(request.params.id).then((mesaj) => {
        if(mesaj) {
             mesaj.update(request.body).then((rezultat) => {
                response.status(201).json(rezultat)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Eroare la actualizare!')
            })
        }else {
                response.status(404).send('Sursa nu exista!')
        }
    }).catch((err) => {
          console.log(err)
          response.status(500).send('Eroare la nivelul bazei de date')
    })
})


app.delete('/categorie/:id', (request, response) => {
    Categorii.findById(request.params.id).then((categorie) => {
        if(categorie) {
            categorie.destroy().then((rezultat) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Eroare la stergere!')
            })
        }else {
               response.status(404).send('Nu s-a regasit resursa!')
        }
    }).catch((err) => {
            console.log(err)
            response.status(500).send('Eroare la nivel baza de date')
    })
})

app.delete('/utilizator/:id', (request, response) => {
    Utilizatori.findById(request.params.id).then((utilizator) => {
        if(utilizator) {
             utilizator.destroy().then((rezultat) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Eroare la stergere!')
            })
        } else {
            response.status(404).send('Nu s-a gasit resursa!')
        }
    }).catch((err) => {
          console.log(err)
          response.status(500).send('Eroare la nivel baza de date')
    })
})

app.delete('/mesaj/:id', (request, response) => {
    Mesaje.findById(request.params.id).then((mesaj) => {
        if(mesaj) {
             mesaj.destroy().then((rezultat) => {
                response.status(204).send()
            }).catch((err) => {
                 console.log(err)
                 response.status(500).send('Eroare la stergere!')
            })
        }else {
             response.status(404).send('Nu s-a gasit resursa!')
        }
    }).catch((err) => {
          console.log(err)
          response.status(500).send('Eroare la nivel baza de date')
    })
})

app.delete('/imagine/:id', (request, response) => {
    Imagini().findById(request.params.id).then((imagine) => {
        if(imagine) {
            imagine.destroy().then((rezultat) => {
             response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('Eroare la stergere!')
            })
        }else {
            response.status(404).send('Nu s-a gasit resursa!')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('Eroare la nivel baza de date')
    })
})


app.listen(8080);