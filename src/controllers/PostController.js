// responsavel pela lógica da aplicação

const Post = require ('../models/Post');
const sharp = require ('sharp');
const path = require ('path');
const fs = require ('fs'); 

module.exports = {
 async index(req, res){
  const posts = await Post.find().sort('-createdAt'); // retorna os posts ordenados por hora de decrescente de criação.
  
  return res.json (posts);  
 },

 // recebe o restante dos dados e dos arquivos 
 async store(req, res){
  const {author, place, description, hashtags} = req.body;
  const {filename: image} = req.file;

  const [name] = image.split ('.');
  const fileName = `${name}.jpg`; 

 //redimensiona a imagem.
  await sharp(req.file.path)
   .resize(500)
   .jpeg({ quality: 70})
   .toFile( 
    path.resolve(req.file.destination, 'resized', fileName)
   )

  fs.unlinkSync(req.file.path); // deleta o arquivo original e armazena somente as imagens redimensionas dentro da pasta resized

  const post = await Post.create ({
   author,
   place,
   description,
   hashtags,
   image: fileName,
  });

  req.io.emit('post', post); // envia uma mensagem em tempo real
  
  return res.json (post); 
 }
};