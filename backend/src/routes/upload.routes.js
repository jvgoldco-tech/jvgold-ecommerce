const express = require('express');
const upload = require('../middlewares/upload');
const { requireAuth, requireAdmin } = require('../middlewares/auth');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// Initialize Supabase Client (Only if environment variables exist)
const supabaseUrl = process.env.SUPABASE_URL || 'https://spakayieccodstyimtij.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Endpoint de subida
// Solo accesible para administradores (requireAuth + requireAdmin)
// Recibe un archivo con la llave 'image'
router.post('/', requireAuth, requireAdmin, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'La imagen excede el límite de 2MB.' });
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se envió ninguna imagen.' });
    }

    if (!supabase) {
      return res.status(500).json({ message: 'Supabase Storage no está configurado (Falta SUPABASE_SERVICE_ROLE_KEY en el servidor).' });
    }

    try {
      // 1. Generar nombre único con formato webp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + '.webp';

      // 2. Procesar y optimizar la imagen en memoria con Sharp
      const webpBuffer = await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toBuffer();

      // 3. Subir el buffer optimizado a Supabase Storage (bucket: 'products')
      const { data, error } = await supabase
        .storage
        .from('products')
        .upload(filename, webpBuffer, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error al subir a Supabase:', error);
        return res.status(500).json({ message: 'Error al subir la imagen al almacenamiento persistente.' });
      }

      // 4. Obtener URL pública
      const { data: publicUrlData } = supabase
        .storage
        .from('products')
        .getPublicUrl(filename);

      res.status(200).json({ 
        message: 'Imagen subida y guardada en Supabase Storage exitosamente.',
        url: publicUrlData.publicUrl 
      });
    } catch (processError) {
      console.error('Error procesando imagen:', processError);
      res.status(500).json({ message: 'Error procesando la imagen.' });
    }
  });
});

module.exports = router;
