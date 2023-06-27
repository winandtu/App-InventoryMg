const jwt = require('jsonwebtoken');

// Middleware para autenticar al usuario
exports.authenticateUser = (req, res, next) => {
  try {
    // Obtiene el token del encabezado de la solicitud
    const token = req.headers.authorization.split(' ')[1];

    // Verifica y decodifica el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, 'secreto');

    // Agrega el ID del usuario y el rol al objeto de solicitud
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role, // Asegúrate de tener el rol del usuario en el token decodificado
    };
    console.log('middleware',req.user); // Agrega esta línea para verificar req.user

    // Continúa con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
};
