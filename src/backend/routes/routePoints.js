const express = require('express');
const router = express.Router();

const pointController = require('../controllers/pointController');

//PUNTO CRUD:

// Ruta para crear
router.post('/create', pointController.createPoint);

// Ruta para obtener todos los datos
router.get('/', pointController.getPoints);

// Ruta para obtener un dato por su ID
router.get('/:id',pointController.getPointById);

// Ruta para obtener los puntos del usuario
router.get('/point-usr/:userId', pointController.getPointUsr);

// Ruta para actualizar un dato por su ID
router.put('/:id', pointController.updatePoint);

// Ruta para eliminar un dato por su ID
router.delete('/:id', pointController.deletePoint);

module.exports = router;