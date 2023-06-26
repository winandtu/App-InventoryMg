// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



//USUARIO CRUD:
// Ruta para crear
router.post('/create', userController.createUser);

// Ruta para obtener todos los datos
router.get('/', userController.getUsers);

// Ruta para obtener un dato por su ID
router.get('/:id', userController.getUserById);

// Ruta para actualizar un dato por su ID
router.put('/:id', userController.updateUser);

// Ruta para eliminar un dato por su ID
router.delete('/:id', userController.deleteUser);

module.exports = router;

