// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
//const operarioMiddleware = require('../middlewares/operarioMiddleware');
const authMiddleware2 = require('../middlewares/operarioMiddleware');


//USUARIO CRUD:
// Ruta para crear
router.post('/create', userController.createUser);

// Ruta para obtener todos los datos
router.get('/', userController.getUsers);

// Ruta para obtener un dato por su ID
router.get('/idUsr/:id', userController.getUserById);

// Ruta para actualizar un dato por su ID
router.put('/:id', authMiddleware.authenticateUser,userController.updateUser);

// Ruta para eliminar un dato por su ID
router.delete('/:id', authMiddleware.authenticateUser,userController.deleteUser);
//ruta para login
router.post('/login', userController.loginUser);
// Ruta para obtener información de los operarios
router.get('/operarios', authMiddleware2, userController.getOperarios);

// Ruta para obtener información de los puntos del operario
router.get('/pointsOperario', authMiddleware2, userController.getPointsOperario);



module.exports = router;
