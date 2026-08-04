const express = require('express');
const upload = require('../middlewares/upload');
const { requireAuth, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

// Endpoint de subida
// Solo accesible para administradores (requireAuth + requireAdmin)
// Recibe un archivo con la llave 'image'
router.post('/', requireAuth, requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'La imagen excede el límite de 2MB.' });
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se envió ninguna imagen.' });
    }

    // Devolver la URL pública de la imagen
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(200).json({ 
      message: 'Imagen subida exitosamente.',
      url: fileUrl 
    });
  });
});

module.exports = router;
