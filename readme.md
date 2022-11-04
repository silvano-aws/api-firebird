Pequeno projeto para montar uma API de acesso ao Firebird em Nodej
usando o módulo node-firebird

Para testar o projeto, altere o arquivo alias.conf do Firebird:

# 
# List of known database aliases 
# ------------------------------ 
# 
# Examples: 
# 
#   dummy = c:\data\dummy.fdb 
#
  
minha-base-de-dados = c:\sistemas\aws\bases\MINHA-BASE-DE-DADOS.FDB

------------------------------------------------------------------------
Depois altere o arquivo conecta.js com o alias sua conexão, informada
anteriormente:

Exemplo:

var Firebird=require('node-firebird');

var options={};
options.host = 'localhost';
options.port = 3050;
options.database = 'minha-base-de-dados';
options.user = 'SYSDBA';
options.password = 'masterkey';
// set to true to lowercase keys
options.lowercase_keys = false; 
// default
options.role = null;            
// default when creating database
options.pageSize = 4096;        
// reconnect interval in case of connection drop
options.retryConnectionInterval = 1000; 

module.exports={Firebird,options}
