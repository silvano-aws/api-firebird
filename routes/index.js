//const req = require('express/lib/request');
var express = require('express');
var router = express.Router();
var cors = require('cors');


const { SSL_OP_ALL } = require('constants');

const {Firebird,options}=require('../database/conecta');
const fs=require('fs');
// carrega o script AWS
const awsTools=require('../public/javascripts/aws-script-srv')

// *** CORS ***
// Libera troca de arquivos entre o servidor e computadores remotos em outros domínios
router.all('*', function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',message:'mensagens' });
});


//Esta Rotina deu certo - Graças a Deus -26/abr/2022
router.post("/qry", async function(req,res,next) {

  if (req.body.user!='admin' || req.body.pwd!='123'){
     res.json({"msg":"Conection refused by server"});
     return
  };  

  var retorno='';
   await Firebird.attach(options, function(err, db) {
      if (err){
         res.json({"msg":"Error to open database!"});
         res.end();
      }else{

      console.log('Conectado com sucesso!'); 
      // db = DATABASE
      //"SELECT SENDER,HOST,POP3 FROM CFG_EMAIL WHERE SR_DELETED<>'T'"
     // sem await não funcionou, passa batido. 
     //var squery=req.params.query;
     var squery=req.body.qry;
     console.log('typeof(squery)--->',typeof(squery));
     console.log('squery',squery);
     if (squery!=undefined){
        db.query(squery, function(err, result) {
        if (err)
           throw err;
         // IMPORTANT: close the connection
         console.log('retorno da query:' );
         console.log(result);
         console.log('Tipo de dados da variavel result: ',typeof(result));
         //console.log(result);
         retorno=JSON.stringify(result);
         //retorno=result.toString();
         console.log('Tipo de dados da variavel retorno: ',typeof(retorno));
         //console.log(retorno);
         db.detach();
         console.log('Tipo da varivael retorno aqui:')
         console.log(typeof(retorno));           
         fs.writeFileSync('database/email.json', retorno,'utf-8') ;
         retorno=JSON.parse(retorno);
         res.json(retorno);
       });
       }else{
          console.log('Empty query!') 
          res.json({"msg":"Empty Query!"})     
       }   
      } //else da conexao  
    })
       
   }) ;    


// Rota para alteracao de dados
router.put("/put",async function(req,res,next) {
   var retorno='';
    Firebird.attach(options, async function(err, db) {
       if (err)
             throw err;
       console.log('Conectado com sucesso!'); 
       // db = DATABASE
       //"SELECT SENDER,HOST,POP3 FROM CFG_EMAIL WHERE SR_DELETED<>'T'"
      // sem await não funcionou, passa batido. 
      //var squery=req.params.query;
      var squery=req.body.query;
      console.log('typeof(squery)--->',typeof(squery));
      console.log('squery',squery);
      if (squery!=undefined){
      await db.query(squery, function(err, result) {
        if (err)
              throw err;
         // IMPORTANT: close the connection
         //console.log('retorno da query:' );
         //console.log(result);
          console.log('Tipo de dados da variavel result: ',typeof(result));
          //console.log(result);
          retorno=JSON.stringify(result);
          //retorno=result.toString();
          console.log('Tipo de dados da variavel retorno: ',typeof(retorno));
          //console.log(retorno);
          db.detach();
          console.log('Tipo da varivael retorno aqui:')
          console.log(typeof(retorno));           
          fs.writeFileSync('database/email.json', retorno,'utf-8') ;
          /*, (err) => {
              if (err) throw err;
                 console.log('O arquivo foi criado!');
          });
          */       
          
          res.format({'application/json':function(){
             retorno=JSON.parse(retorno);
             res.json(retorno);
             }       
         });   
            });
        }else{
           console.log('Empty query!') 
           res.json({"msg":"Empty Query!"})     
        }   
     })     
    }) ;    
 
 

//Rota para apagar dados
router.delete("/del",async function(req,res,next) {
  var retorno='';
   Firebird.attach(options, async function(err, db) {
      if (err)
            throw err;
      console.log('Conectado com sucesso!'); 
      // db = DATABASE
      //"SELECT SENDER,HOST,POP3 FROM CFG_EMAIL WHERE SR_DELETED<>'T'"
     // sem await não funcionou, passa batido. 
     //var squery=req.params.query;
     var squery=req.body.query;
     console.log('typeof(squery)--->',typeof(squery));
     console.log('squery',squery);
     if (squery!=undefined){
     await db.query(squery, function(err, result) {
       if (err)
             throw err;
        // IMPORTANT: close the connection
         console.log('Tipo de dados da variavel result: ',typeof(result));
         retorno=JSON.stringify(result);
         console.log('Tipo de dados da variavel retorno: ',typeof(retorno));
         db.detach();
         console.log('Tipo da varivael retorno aqui:')
         console.log(typeof(retorno));           
         fs.writeFileSync('database/email.json', retorno,'utf-8') ;
         /*, (err) => {
             if (err) throw err;
                console.log('O arquivo foi criado!');
         });
         */       
         
         res.format({'application/json':function(){
            retorno=JSON.parse(retorno);
            res.json(retorno);
            }       
        });   
           });
       }else{
          console.log('Empty query!') 
          res.json({"msg":"Empty Query!"})     
       }   
    })     
   }) ;    



//rota para teste de troca de aqruivos via HTTP
router.get('/testejson',async function(req,res){
    res.format ({
        //'application/json' 'text/plain'
      'application/json'
        : await function() {
          // para testar com o c:\web\json\tete2-json.html
          //fs.readFile('public/json/teste.json','utf-8', function(err,data){
          //para testar com o c:\web\json\heroes.html  
          fs.readFile('database/email.json','utf-8', function(err,data){
          //fs.readFile('public/json/estados.json','utf-8', function(err,data){
             if(err){
               return console.log("Erro ao ler arquivo");
             }
           console.log('Tipo de dados data');
           console.log(typeof(data));  
           var jsonData = JSON.parse(data); // faz o parse para jsons
           console.log('Tipo de dado: ',typeof(jsonData)); 
           console.log(jsonData);
           //res.send(data);
           res.json(jsonData);
           //res.end();
         })
        }
     }) 
  });
  
 

module.exports = router;

