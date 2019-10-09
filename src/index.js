// Ponto de entrada da aplicação

const express = require('express');// importação das dependencias. 
const mongoose = require ('mongoose');
const path = require ('path');
const cors = require ('cors');

const app = express();

//divisão do servidor para suportar o protocolo
//Http quanto o websocket
//permite a conexão em tempo real
const server = require ('http'). Server(app);
const io = require ('socket.io')(server);

// conexão com o Banco de dados.
mongoose.connect('mongodb+srv://andre:12345@cluster0-yeqlo.mongodb.net/test?retryWrites=true&w=majority', {
 useNewUrlParser: true,
});

//repassa as informações para o frontend
app.use ((req, res, next)=>{
 req.io = io;

 next();
})

app.use(cors());// permite que todas urls de todos os servidores
//possam acessar as informações do backend

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))) //rota para acessar serviços estáticos

 app.use(require('./routes')); //arquivo de rotas 

server.listen (3333);