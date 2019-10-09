const multer = require('multer');
const path = require('path');

// configuração do destino para onde os arquivos irão.
module.exports = {
 storage: new multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: function(req, file, cb){
   cb (null, file.originalname); // utiliza o mesmo nome do arquivo.
  }
 })
};