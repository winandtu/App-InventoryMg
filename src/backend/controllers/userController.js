// userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Point = require('../models/points');
const sequelize = require('../config/database'); // Importa sequelize


// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // Obtén los datos del usuario del cuerpo de la solicitud
    const { name, username, password, role } = req.body;

    // Crea un nuevo usuario en la base de datos utilizando el modelo de usuario
    const newUser = await User.create({
      name,
      username,
      password: await bcrypt.hash(password, 10), // Encripta la contraseña antes de almacenarla
      role
    });

    // Devuelve una respuesta exitosa con el usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.log(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Controlador para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    // Obtiene todos los usuarios de la base de datos utilizando el modelo de usuario
    const users = await User.findAll();

    // Devuelve una respuesta exitosa con los usuarios obtenidos
    res.status(200).json(users);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    // Obtén el ID del usuario de los parámetros de la ruta
    const { id } = req.params;

    // Busca un usuario en la base de datos por su ID utilizando el modelo de usuario
    const user = await User.findByPk(id);

    // Si el usuario existe, devuelve una respuesta exitosa con el usuario encontrado
    if (user) {
      res.status(200).json(user);
    } else {
      // Si el usuario no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    // Obtén el ID del usuario de los parámetros de la ruta
    const { id } = req.params;

    // Obtén los nuevos datos del usuario del cuerpo de la solicitud
    const { name, username, password, role } = req.body;

    // Busca y actualiza un usuario en la base de datos por su ID utilizando el modelo de usuario
    const updatedUser = await User.update(
      { name, username, password, role },
      { where: { id } }
    );

    // Si se actualizó correctamente, devuelve una respuesta exitosa
    if (updatedUser[0] === 1) {
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } else {
      // Si el usuario no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    // Obtén el ID del usuario de los parámetros de la ruta
    const { id } = req.params;

    // Elimina un usuario de la base de datos por su ID utilizando el modelo de usuario
    const deletedUser = await User.destroy({ where: { id } });

    // Si se eliminó correctamente, devuelve una respuesta exitosa
    if (deletedUser === 1) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      // Si el usuario no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

// Controlador para iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    // Obtén los datos del usuario del cuerpo de la solicitud
    const { username, password } = req.body;

    // Busca al usuario en la base de datos por su nombre de usuario
    const user = await User.findOne({ where: { username } });

    // Si el usuario no existe, devuelve una respuesta de error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, devuelve una respuesta de error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Genera un token JWT con el ID del usuario y el rol
    const token = jwt.sign({ id: user.id, role: user.role }, 'secreto');
    console.log(token);
    console.log(user.role);

    // Devuelve una respuesta exitosa con el token JWT
    res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


// Controlador para obtener información de los operarios
exports.getOperarios = async (req, res) => {
  try {
    // Verifica si se proporcionó un token en el encabezado de la solicitud
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Se asume que el encabezado de autorización tiene el formato 'Bearer {token}'

    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, 'secreto'); // Reemplaza 'secretKey' con tu clave secreta

    // Verifica si el usuario existe en la base de datos
    const usuarioActual = await User.findByPk(decodedToken.id);
    console.log('usuario actual es: ', usuarioActual.get('id')); //da el id usuario
    const puntos = await Point.findAll({
      where: { userId: usuarioActual.get('id') },
      include: [{ model: User }]
    });

    console.log('puntos encontrados: ', puntos);
    if (!usuarioActual) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Si se pasaron todas las verificaciones, retorna la información del usuario
    res.status(200).json(usuarioActual);
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: 'Error al obtener la información del operario' });
  }
};


exports.getPointsOperario = async (req, res) => {
  try {
    // Verifica si se proporcionó un token en el encabezado de la solicitud
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Se asume que el encabezado de autorización tiene el formato 'Bearer {token}'

    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, 'secreto'); // Reemplaza 'secretKey' con tu clave secreta

    // Verifica si el usuario existe en la base de datos
    const usuarioActual = await User.findByPk(decodedToken.id);
    console.log('usuario actual es: ', usuarioActual.get('id')); //da el id usuario

    //hace el join entre id del usuario y el id del usuario en la tabla points
    const puntos = await Point.findAll({
      where: { userId: usuarioActual.get('id') },
      include: [{ model: User, attributes: [] }]
    });

    console.log('puntos encontrados: ', puntos);
    if (!puntos) {
      return res.status(404).json({ error: 'El usuario no tiene puntos' });
    }

    // Si se pasaron todas las verificaciones, retorna la información del usuario
    res.status(200).json(puntos);
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: 'Error al obtener la información del operario' });
  }
};