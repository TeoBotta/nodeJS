//Defino variables para invocar módulos
var http = require('http');//El módulo HTTP viene por defecto en Node, se usa para tranferir datos por HTTP
var dt = require('./firstmodule');//Módulo creado el la ubicación actual del archivo
var url = require('url');//Módulo para leer datos sobre el url actual de la página cargada
var fs = require('fs');//Módulo para llamados a file system

//Creamos un objeto de tipo servidor
http.createServer(function (req, res) {
    //res.write("Dia y hora actuales: "+dt.diaHoraActuales());//Escribimos un response en el cliente
    fs.readFile('file1.html', function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });
    //res.end(txt);//Termina el response
}).listen(8080);//El servidor escucha el puerto 8080

//---------------------File System INICIO------------------------//
//fs.appendFile() Agrega contenido a un archivo. Si el archivo no existe, lo crea
fs.appendFile('newfile1.txt','Hello!', function(err){
    if(err) throw err;
    console.log('Saved!');
});

//fs.open() Toma como segundo parámetro la función a realizar sobre el archivo enviado por parámetro. Si es 'w' es para escritura
fs.open('newfile2.txt','w', function(err,file){
    if(err)throw err;
    console.log('Saved!');
});

//fs.writeFile() Reemplaza el contenido del archivo pasado como parámetro por el nuevo contenido pasado como parámetro. Si no existe el archivo, lo crea
fs.writeFile('newfile3.txt','Hello!',function(err){
    if(err)throw err;
    console.log('Saved!');
});

//fs.unlink() Elimina un archivo pasado por parámetro
fs.unlink('newfile2.txt',function(err){
    if(err)throw err;
    console.log('File deleted!');
});

//fs.rename() Renombra un archivo pasado por parámetro
fs.rename('newfile1.txt','renamedfile1.txt',function(err){
    if(err) throw err;
    console.log('File Renamed!');
});

//---------------------File System FIN------------------------//

//---------------------URL INICIO------------------------//

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host);//Retorna 'localhost:8080'
console.log(q.pathname);//Retorna '/default.htm'
console.log(q.search);//Retorna '?year=2017&month=february'

var qdata = q.query;//Retorna un objeto: {year:2017,month:'february'}
console.log(qdata.month);//Retorna 'february'

//Ejemplo de aplicación:
http.createServer(function(req,res){
    var q = url.parse(req.url,true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err,data){
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

//---------------------URL FIN------------------------//

//---------------------NPM INICIO------------------------//

//Para Instalar un paquete: npm install <nombre_paquete> (en Consola)
//Ejemplo de aplicación:
var http = require('http');
var uc = require('upper-case');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(uc("Hello World!"));
    res.end();
}).listen(8080);

//---------------------NPM FIN------------------------//

//---------------------Eventos INICIO------------------------//

var events = require('events');
var eventEmitter = new events.EventEmitter();//Con el emisor de eventos se asigna un manejador de eventos (que se debe declarar) a un evento

//Creo el manejador (handler) de eventos
var eventHandler = function(){
    console.log('I hear a scream!');
}

//Asigno un evento al handler
eventEmitter.on('scream',eventHandler);

//Disparo el evento 'scream'
eventEmitter.emit('scream');

//---------------------Eventos FIN------------------------//

//---------------------Upload Files INICIO------------------------//

//Instalar el paquete 'formidable'
var formidable = require('formidable');

//El código siguiente produce un formulario HTML
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<form action="filesupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
}).listen(8080);

//El siguiente código 'sube' un archivo (lo coloca en una carpeta temporal)
var http = require('http');
var formidable = require('formidable');

http.createServer(function(req,res){
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err,fields,files){
            res.write('File uploaded');
            res.end();
        }),
    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<form action="fileupload" method="post" enctype=multipart/form-data">');
        res.write('<input type="file" mane="filetoupload"><br>');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);

//El código siguiente permite mover archivos de la carpeta temporal a una carpeta local
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function(req,res){
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            var oldpath = files.filetoupload.path;
            var newpath = 'C:/Users/Teo/'+files.filetoupload.name;
            fs.rename(oldpath,newpath,function(err){
                if(err)throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form.data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        return res.end();
    }
}).listen(8080);

//---------------------Upload Files FIN------------------------//

//---------------------Nodemailer INICIO------------------------//

//Para installar Nodemailer: npm install nodemailer

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user:'teo_maiden@hotmail.com',
        pass:'hellsayan1020'
    }
});

var mailOptions = {
    from:'teo_maiden@hotmail.com',
    to:'teombotta@gmail.com',   //Si quiero mandar a más de un mail --> to: 'c1@gmail.com, c2@yahoo.com'
    subject:'Mail de prueba usando NodeJS',
    text:'Espero haya funcionado' //Para mandar formato html en el texto ---> html:'<h1>Hola</h1><p>Holis</p>'
};

transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log('Email sent: '+info.responde);
    }
});

//---------------------Nodemailer FIN------------------------//

//---------------------MySQL INICIO------------------------//

//Antes de instalar los paquetes, me tengo que asegurar que MySQL está instalado en la compu
//Para instalar el paquete: npm install mysql

//El siguiente código es para crear una conección a la BD

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "youpassword"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
});

//El siguiente código es para realizar una query sobre la BD

con.connect(function(err){
    if(err)thro err;
    console.log("Connected");
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log("Result: "+result);
    });
});

//El siguiente código permite crear una BD

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    con.query("CREATE DATABASE mydb", function(err,result){
        if(err)throw err;
        console.log("DB creada");
    });
});

//El siguiente código es para crear una tabla

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log("Tabla creada");
    });
});

//Ejemplo para crear una tabla con primary key

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENTE PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log("Tabla creada");
    });
});

//Cómo modificar una tabla existente para incorporar una primary key

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log("Tabla modificada");
    });
});

//Código para realizar un INSERT en una tabla existente

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Hisghway 37')";
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log("1 registro insertado");
    });
});

//Código para realizar múltiples INSERT en una tabla

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    console.log("Connected");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
        ['John','Highway 71'],
        ['Peter','Lowstreet 4'],
        ['Amy','Apple st 652'],
        ['Hannah','Mountain 21'],
        ['michael','Valley 345']
    ];
    con.query(sql, [values], function(err, result){
        if(err)throw err;
        console.log("Numero de registros insertados: " + result.affectedRows);
    });
});

//Código para retornar el ID de un elemento de una tabla

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "INSERT INTO customers (name, address) VALUES ('Michelle','Blue Village 1')";
    con.query(sql,function(err,result){
        if(Err)throw err;
        console.log("1 registro insertado, ID: " + result.insertId);
    };
});

//Código para seleccionar todos los registros de una tabla llamada 'customers'

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    con.query("SELECT * FROM customers", function(err,result,fields){
        if(err)throw err;
        console.log(result);
    });
});

//Código para seleccionar una columna específica de la tabla

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    con.query("SELECT name, address FROM customers", function (err, result, fields){
        if(err)throw err;
        console.log(result);//console.log(fields) sirve para retornar información sobre cada campo del resultado
    });
});


//Código de consulta con un WHERE incluído

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//Código para hacer uso del LIKE

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    con.query("SELECT * FROM customers WHERE address LIKE 'S%'", function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//Código para el uso de valores 'escape'

var adr = 'Mountain 210';
var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
con.query(sql, function(err,result){
    if(err)throw err;
    console.log(result);
});

//Otro código de ejemplo (en comentarios están los cambios a realizar si se tienen múltiples placeholders)

//var name = 'Amy'
var adr = 'Mountain 21';
var sql = 'SELECT * FROM customers WHERE address = ?';  //var sql = 'SELECT * FROM customers WHERE name = ? OR  address = ?';
con.query(sql,[adr],function(err,result){   //con.query(sql,[name,adr],function(err,result){
    if(err)throw err;
    console.log(result);
});

//Código para ordenar los resultados de una query aplicada

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    con.query("SELECT * FROM customers ORDER BY name", function(err, result){   //con.query("SELECT * FROM customers ORDER BY name DESC", function(err,function){
        if(err)throw err;
        console.log(result);
    });
});

//Código para aplicar el uso de DELETE (eliminar registros de la tabla)

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log("Numero de registro eliminados: " + result.affectedRows);
    });
});

//Código para eliminar una tabla completa

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "DROP TABLE customers";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log("Tabla eliminada");
    });
});

//Código que aplica el IF EXITS al momento de eliminar

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "DROP TABLE IF EXISTS customers";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//Código para el uso de UPDATE

var mysql = require('mysql');

var con = mysql.createConeection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.coneect(function(err){
    if(err)throw err;
    var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    con.query(sql, function(err,result){
        if(err)throw err;
        console.log(result.affectedRows + " registro(s) actualizado(s)");
    });
});

//Códio para mostrar el uso de LIMIT

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "SELECT * FROM customers LIMIT 5";
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//Código que utiliza el LIMIT y el OFFSET

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2"; //var sql = "SELECT ¨FROM customers LIMIT 2, 5;"
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//Código para mostrar el uso del JOIN

var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"yourusername",
    password:"yourpassword",
    database:"mydb"
});

con.connect(function(err){
    if(err)throw err;
    var sql = "SELECT users.name AS user, producto.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
    con.query(sql,function(err,result){
        if(err)throw err;
        console.log(result);
    });
});

//---------------------MySQL FIN------------------------//

//---------------------MongoDB INICIO------------------------//

//Para instalar el paquete: npm install mongodb

//Para invocarlo en código: var mongo = require('mongodb');

//Código para crear una base

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    console.log("Database created");
    db.close();
});

//Código para crear una colección (equivalente a una tabla)

var MongoClient = require('mongodb').MongoCliente;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers",function(err,res){
        if(err)throw err;
        console.log("Coleccion creada");
        db.close();
    });
});

//Código para insertar un documento (equivalente a un registro o tupla) en la colección

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myobj = { name:"Company Inc",address:"Highway 37"};
    dbo.collection("customers").insertOne(myobj, function(err,res){
        if(err)throw err;
        console.log("1 document inserted");
        db.close();
    });
});

//Si se trata de incorporar documentos a una colección que no existe, MongoDB crea la colección

//Código para insertar múltiples documentos en la colección

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myobj = [
        {name: 'John', address: 'Highway 71'},
        {name: 'Peter', address: 'Lowstreet 4'},
        {name: 'Amy', address: 'Apple st 652'},
        {name: 'Hannah', address: 'Mountain 21'},
        {name: 'Michael', address: 'Valley 345'},
        {name: 'Sandy', address: 'Ocean blvb 2'},
        {name: 'Betty', address: 'Green Grass 1'}
    ];
    dbo.collection("customers").insertMany(myobj,function(err,res){
        if(err)throw err;
        console.log("Numero de documentos insertados: " + res.insertedCount);
        db.close();
    });
});

//Si no se especifica un campo '_id' para el documento, Mongo lo genera automáticamente

//El siguiente código incorpora documentos con id definido a una colección

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myobj = [
        {_id: 154, name: 'Chocolate Heaven'},
        {_id: 155, name: 'Tasty Lemon'},
        {_id: 156, name: 'Vanilla Dream'}
    ];
    dbo.collection("products").insertMany(myobj,function(err,res){
        if(err)throw err;
        console.log(res);
        db.close();
    });
});

//En Mongo, la equivalencia al SELECT son el FIND y FINDONE (retorna la primer ocurrencia)

//Código para el uso del finOne()

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({},function(err,result){
        if(err)throw err;
        console.log(result.name);
        db.close();
    });
});

//Código que usa el find()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para el uso del find() con segundo parámetro (projection)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({},{projection:{_id:0,name:1,address:1}
    }).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para el uso del find() excluyendo atributos

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({},{projection:{address: 0}}).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para el uso del find() que retorna solo el campo 'name'

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({},{projection: { _id: 0, name: 1 } }).toArray(function(err,result) {
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para demostrar el uso de la inclusión de querys en el método find()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para mostrar el uso de expresiones regulares

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var query = { address: /^S/ };
    dbo.collection("customers").find(query).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para mostrar el uso del comando sort()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var mysort = { name: 1 };
    dbo.collection("customers").find().sort(mysort).toArray(function(err,result) {
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para mostrar el sort de forma descendente

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var mysort = { name: -1 };
    dbo.collection("customers").find().sort(mysort).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db.close();
    });
});

//Código para mostrar el uso del deleteOne()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myquery = {address: 'Mountain 21' };
    dbo.collection("customers").deleteOne(myquery, function(err,onj){
        if(err)throw err;
        console.log("1 document deleted");
        db.close();
    });
});

//Código para mostrar el use del deleteMany()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myquery = { address: /^O/ };
    dbo.collection("customers").deleteMany(myquery, function(err,obj){
        if(err)throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});

//Código para mostrar el uso del drop()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb::/localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.dbo("mydb");
    dbo.collection("customers").drop(function(err,delOK){
        if(err)throw err;
        if(delOK) console.log("Collection deleted");
        db.close();
    });
});

//Código para mostrar el uso del dropCollection()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.dropCollection("customers",function(err,delOK){
        if(err)throw err;
        if(delOK) console.log("Collection deleted");
        db.close();
    });
});

//Código para mostrar el uso del updateOne()
//NOTA: Si la query para hallar el documento a actualizar obtiene más de un resultado, modifica la primer ocurrencia

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myquery = { address: "Valley 345" };
    var newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
    dbo.collection("customers").updateOne(myquery,newvalues, function(err,res){
        if(err)throw err;
        console.log("1 document updated");
        db.close();
    });
});

//Código para mostrar el uso del updateMany()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    var myquery = { address: /^S/ };
    var newvalues = {$set: {name: "Minnie"} };
    dbo.collection("customers").updateMany(myquery,newvalues,function(err,res){
        if(err)throw err;
        console.log(res.result.nModified + " document(s) updated");
        db.close();
    });
});

//Código para mostrar el uso del limit()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find().limit(5).toArray(function(err,result){
        if(err)throw err;
        console.log(result);
        db-close();
    });
});

//Código para mostrar el uso del aggregate() <Sería un JOIN>

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if(err)throw err;
    var dbo = db.db("mydb");
    dbo.collection('orders').aggregate([
        { $lookup:
            {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'orderdetails'
            }
        }
    ]).toArray(function(err,res){
        if(err)throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});

//---------------------MongoDB FIN------------------------//

//---------------------Raspberry Pi INICIO------------------------//