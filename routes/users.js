var express = require('express');
var router = express.Router();

const { SSL_OP_ALL } = require('constants');

const {Firebird,options}=require('../database/conecta');
const fs=require('fs');
// carrega o script AWS
const awsTools=require('../public/javascripts/aws-script-srv')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Esta Rotina deu certo - Graças a Deus -26/abr/2022
router.post("/logon", function(req,res,next) {
  var pwRet=''
  var retorno='';

 //console.log('Nome:--> '+req.body.nome);
  Firebird.attach(options, function (err, db) {
     if (err) {
        res.json({ "logon":"err",msg: "Error to open database!" });
        res.end();
        return;
     }

     if (squery = undefined) {
        res.json({ "logon":"err",msg: "Dados incompletos!" });
        return;
     }

     //----------------- Pwd enviada pelo form -------------------
     const senhaPost = req.body.senha.trim().toUpperCase();
     //-----------------------------------------------------------
     var squery = `SELECT CODUSU,SENHA FROM CFG_USUARIOS WHERE NOME='${req.body.nome.toUpperCase()}' AND SR_DELETED<>'T'`;

     db.query(squery, function (err, result) {
        if (err)
           throw ({"logon":"err","msg":err});
        //return;
        db.detach();

        if (result.length > 0) {
           //retorno=JSON.stringify(result);
            pwRet = awsTools.desCript(result[0].SENHA);
           console.log('Senha Descript:' + pwRet +' '+senhaPost);
           if (pwRet !== senhaPost) {
              res.json({ "logon":"err","msg": "Senha inválida, tente novamente!" });
              return;
           }
        }   
        else{
           //console.log('-->Empty query!');
           res.json({"logon":"err", "msg": "Usuário não encontrado!" });
           return;
        }

       console.log('Conectado com sucesso!');
       //console.log('Nome ' + req.body.nome + ' Senha: ' + req.body.senha);
        
       res.json({"logon":"ok","msg":"Conectado com sucesso!"});
       
     });
});

})          

module.exports = router;
