// pointController.js

const Point = require('../models/points');
//const User = require('../models/user');

// Controlador para crear un nuevo punto
exports.createPoint = async (req, res) => {
  try {
    // Obtén los datos del punto del cuerpo de la solicitud
    const { name, longitude, latitude, comments, userId } = req.body;
    // Crea un nuevo punto en la base de datos utilizando el modelo de punto
    const newPoint = await Point.create({
      name,
      longitude,
      latitude,
      comments,
      userId,
    });

    // Devuelve una respuesta exitosa con el punto creado
    res.status(201).json(newPoint);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al crear el punto' });
  }
};

// Controlador para obtener todos los puntos
exports.getPoints = async (req, res) => {
  try {
    // Obtiene todos los puntos de la base de datos utilizando el modelo de punto
    const points = await Point.findAll();

    // Devuelve una respuesta exitosa con los puntos obtenidos
    res.status(200).json(points);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los puntos' });
  }
};

// Controlador para obtener un punto por id del usuario
exports.getPointUsr = async (req, res) => {
  try {
    // Obtén el ID del usuario de los parámetros de la ruta
    const { userId } = req.params;

    // Busca los puntos en la base de datos por el ID del usuario utilizando el modelo de punto
    const points = await Point.findAll({ where: { userId } });

    // Si se encuentran puntos, devuelve una respuesta exitosa con los puntos encontrados
    if (points.length > 0) {
      res.status(200).json(points);
    } else {
      // Si no se encuentran puntos, devuelve una respuesta de error
      res.status(404).json({ error: 'No se encontraron puntos para el usuario especificado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los puntos' });
  }
};







// Controlador para obtener un punto por su ID
exports.getPointById = async (req, res) => {
  try {
    // Obtén el ID del punto de los parámetros de la ruta
    const { id } = req.params;

    // Busca un punto en la base de datos por su ID utilizando el modelo de punto
    const point = await Point.findByPk(id);

    // Si el punto existe, devuelve una respuesta exitosa con el punto encontrado
    if (point) {
      res.status(200).json(point);
    } else {
      // Si el punto no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Punto no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el punto' });
  }
};

// Controlador para actualizar un punto por su ID
exports.updatePoint = async (req, res) => {
  try {
    // Obtén el ID del punto de los parámetros de la ruta
    const { id } = req.params;

    // Obtén los nuevos datos del punto del cuerpo de la solicitud
    const { name, longitude, latitude, comments, userId } = req.body;

    // Busca y actualiza un punto en la base de datos por su ID utilizando el modelo de punto
    const updatedPoint = await Point.update(
      { name, longitude, latitude, comments, userId },
      { where: { id } }
    );

    // Si se actualizó correctamente, devuelve una respuesta exitosa
    if (updatedPoint[0] === 1) {
      res.status(200).json({ message: 'Punto actualizado correctamente' });
    } else {
      // Si el punto no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Punto no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el punto' });
  }
};

// Controlador para eliminar un punto por su ID
exports.deletePoint = async (req, res) => {
  try {
    // Obtén el ID del punto de los parámetros de la ruta
    const { id } = req.params;

    // Elimina un punto de la base de datos por su ID utilizando el modelo de punto
    const deletedPoint = await Point.destroy({ where: { id } });

    // Si se eliminó correctamente, devuelve una respuesta exitosa
    if (deletedPoint === 1) {
      res.status(200).json({ message: 'Punto eliminado correctamente' });
    } else {
      // Si el punto no existe, devuelve una respuesta de error
      res.status(404).json({ error: 'Punto no encontrado' });
    }
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta de error
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el punto' });
  }
};
