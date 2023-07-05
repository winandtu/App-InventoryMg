const express = require('express');
const router = express.Router();

const pointController = require('../controllers/pointController');
const authMiddleware = require('../middlewares/authMiddleware');

//PUNTO CRUD:

// Ruta para crear
router.post('/create',pointController.createPoint);

// Ruta para obtener todos los puntos en el mapa
router.get('/',pointController.getPoints);

// Ruta para obtener un dato por su ID
router.get('/:id',authMiddleware.authenticateUser,pointController.getPointById);

// Ruta para obtener los puntos del usuario
router.get('/point-usr/:userId', authMiddleware.authenticateUser,pointController.getPointUsr);

// Ruta para actualizar un dato por su ID
router.put('/:id', authMiddleware.authenticateUser,pointController.updatePoint);

// Ruta para eliminar un dato por su ID
router.delete('/:id', authMiddleware.authenticateUser,pointController.deletePoint);

module.exports = router;