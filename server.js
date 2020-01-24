
var http = require('http'),
express  = require('express'),
bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://vndkgmnovwcudz:bd0da1d0c70efdea9f06be6f4e859b17d89f9202f3754ab66384693942ffb4bf@ec2-174-129-33-186.compute-1.amazonaws.com:5432/da6r9929umk6ro";
var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
    
    
function permitirCrossDomain(req, res, next) {
        //en vez de * se puede definir SÓLO los orígenes que permitimos
        res.header('Access-Control-Allow-Origin', '*'); 
        //metodos http permitidos para CORS
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      }  
      
      var app = express();

      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      
      app.use(express.static('public'));
      app.use(permitirCrossDomain);
      
      
      app.get('/', function(req, res){
        res.send('hello world');
      });

      app.get('/listUsers', (req, res, next) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('SELECT * FROM usuario', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
        
                client.end();
                return res.json(result.rows);
                
            });
        });
    });
    
    app.get('/listUser/:id',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.params.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result.rows);
            
            });
            
        });
    });
    app.put('/updateUser',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query("UPDATE usuario SET nombre='"+req.body.nombre+"',mail='"+req.body.mail+"', nom_user='"+req.body.nom_user+"',pass='"+req.body.pass+"' WHERE id='" + id + "';", function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    });
    app.post('/SaveUser', (req, res) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
            
            console.log("miau "+util.inspect(req,false,null));
            
            client.query("INSERT INTO  usuario  (nombre,mail,nom_user,pass) VALUES ('"+req.body.nombre+"', '"+req.body.mail+"', '"+req.body.nom_user+"', '"+req.body.pass+"');", function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
            
                //console.log(result);
                client.end();
                return res.json(result.rows);
                
            });
            
        });
    });
    app.delete('/deleteUser',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    
    
    });
    
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});