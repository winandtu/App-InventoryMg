const jwt = require('jsonwebtoken');

// Middleware para autenticar al usuario
exports.authenticateUser = (req, res, next) => {
  try {
    // Obtiene el token del encabezado de la solicitud
    const token = req.headers.authorization.split(' ')[1];

    // Verifica y decodifica el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, 'secreto');

    // Agrega el ID del usuario al objeto de solicitud
    req.user = { id: decodedToken.userId };

    // Continúa con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
};
