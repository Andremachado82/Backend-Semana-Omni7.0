const Post = require ('../models/Post');

module.exports = {
 async store(req, res){
  const post = await Post.findById(req.params.id);

  post.likes += 1; // acrescenta um like a cada solicitação

  await post.save();

  req.io.emit('like', post); // envia a mensagem

  return res.json (post); 
 }
}; 