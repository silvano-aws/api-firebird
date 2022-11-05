Pequeno projeto para montar uma API de acesso ao Firebird em Nodej
usando o módulo node-firebird -  Precisa antes instalar o Firebird
de sua preferência.

Ao instalar o nodejs tem que alterar a variavel de ambiente path para dizer onde
está instalado o node

Para testar, sair para o terminal (cmd) e digitar node -v e npm -v

Instalar o express e o express generator: 
npm install -g -s express express generator

-g= instala globalmente para todos os projetos  -s = registra a instalação no 


Para configurar o express:

express --view=ejs nome-do-projeto -->ja cria a estrutra de pastas do projeto
conforme abaixo


bin          - onde fica o arqwuivo www de configuração do servidor
node_modules - onde ficam todas as dependencias instaladas automaticamente pelo npm install
public       - arquivos estáticos, tipo imagens, scripts, css
routes       - rotas para requisicoes http://
views        - armazena as pastas de exibicção (html) mas com extensão ejs por causa do view engine ejs 
instalado

depois de tudo instalado para rodar o sistema digitar:
Para preencher o packge.json:
npm init

instalar o HTTP-ERRORS
npm install http-errors --save

Intalar o driver do Firebird para Nodejs:
npm install node-firebird@1.1.1


npm start ou NODEMON (pacote que monitora alterações nos fontes)

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

Para testar autenticação via HTML com fetch, rode o arquivo testeapi.html


Para testar querys, digite: https://localhost:3010

usuário: admin
senha: 123

Digite a query em formato SQL do Firebird, relativos a sua base de dados
