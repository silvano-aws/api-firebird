var Firebird=require('node-firebird');

var options={};
options.host = 'localhost';
options.port = 3050;
/*
 Alias do banco de dados definido no arquivo aliases.conf
 na pasta opt/firebird/ --> para editar tem que abrir a pasta como root
 Pasta física: /home/silvano/firebird-data/empresarial_constroi.fdb
*/
options.database = 'happypet';
options.user = 'SYSDBA';
options.password = 'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096;        // default when creating database
options.pageSize = 4096;        // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop

module.exports={Firebird,options}