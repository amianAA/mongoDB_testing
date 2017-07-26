//Express
var express = require('express');
var app = express(),
    http     = require("http"),
    server   = http.createServer(app)
//Mongoose
var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/comanda";
var options = {
  useMongoClient: true
}
var db = mongoose.connection;

//Conexion a MongoDB
mongoose.connect(uri, options);
db.on('error', function () {
  console.log("Error al conectarse a MongoDB")
});
db.once('open', function () {
  console.log("Conectado a MongoDB")
});

//Schema del contenido de la BBDD
var orderSchema = mongoose.Schema({
  id: Number,
  food: String,
  drink: String
});
//Middleware

//Estructura tabla BBDD
var Order = mongoose.model('Order', orderSchema);

//GET
app.get('/tables', function (req, res) {
  console.log("Has preguntado por tablas")
  Order.find(function(err,p){
    if (err) return console.error(err);
      res.json(p);
    });

    //res.json(aux);
    //res.status(200).jsonp(aux);
});

//POST
var order = new Order({id: 1, food: "Pizza", drink:"Coke"})
order.save(function(err) {
if (err) throw err;
console.log('Comanda registrada');
});


app.listen(3000);
