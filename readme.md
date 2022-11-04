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
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database
options.pageSize = 4096;        // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop

module.exports={Firebird,options}
