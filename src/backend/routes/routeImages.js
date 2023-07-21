const express = require('express');
const router = express.Router();
const pointImagesController = require('../controllers/imagesController');

// Ruta para crear
router.post('/create', pointImagesController.createPointImage);
// Ruta para obtener todos los datos
router.get('/', pointImagesController.getPointImages);
// Ruta para obtener un dato por su ID
router.get('/:id', pointImagesController.getPointImageById);
// Ruta para eliminar un dato por su ID
router.delete('/:id', pointImagesController.deletePointImageById);

// Ruta para eliminar un dato por su ID de punto
router.delete('/deleteByPoint/:pointId', pointImagesController.deleteImagesByPointId);

// Ruta para obtener un dato por su ID de punto
router.get('/pointImg/:pointId', pointImagesController.getImagesByPointId);
// Ruta para actualizar un dato por su ID
router.put('/:id', pointImagesController.updatePointImageById);

module.exports = router;
