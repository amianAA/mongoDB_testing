//Express
var express = require('express');
var app = express();

//Mongoose
var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/comanda";
var options = { useMongoClient: true}
var db = mongoose.connection;
//Conexion a MongoDB
mongoose.connect(uri, options);
db.on('error',function(){
console.log("Error al conectarse a MongoDB")
});
db.once('open', function() {
console.log("Conectado a MongoDB")
});
//Schema del contenido de la BBDD
var orderSchema = mongoose.Schema({
food: String,
drink: String
});
//Estructura tabla BBDD
var Order = mongoose.model('Order', orderSchema);
//GET
app.get('/tables', function (req, res) {
  console.log("Has preguntado por tablas")
  res.send(db.orders.find())
});
/*POST
var order = new Order({food: "Pizza", drink:"Coke"})
order.save(function(err) {
if (err) throw err;
console.log('Comanda registrada');
});
*/

app.listen(3000);
