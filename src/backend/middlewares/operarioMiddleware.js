const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autorización no proporcionado' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token de autorización inválido' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.id = decoded.id;
    next();
  } catch (error) {
    // Registra el error en un log de errores o utiliza un mecanismo de manejo de errores centralizado
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token de autorización inválido' });
    }

    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = authMiddleware;
