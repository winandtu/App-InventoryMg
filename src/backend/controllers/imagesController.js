const Images = require('../models/pointImages');

// Controlador para crear una nueva imagen
exports.createPointImage = async (req, res) => {
    try {
        //Datos del cuerpo de la solicitud
        const { pointId, imageUrl } = req.body;
        //Creación de la imagen
        const newPointImage = await Images.create({
            imageUrl,
            pointId
        });
        //Respuesta exitosa con la imagen creada
        res.status(201).json(newPointImage);
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al crear la imagen' });
    }
};

//Controlador para obtener todas las imagenes
exports.getPointImages = async (req, res) => {
    try {
        //Obtiene todas las imagenes de la base de datos
        const pointImage = await Images.findAll();
        //Respuesta exitosa con las imagenes obtenidas
        res.status(200).json(pointImage);
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las imagenes' });
    }
};
//Controlador para obtener todas las imagenes de un punto
exports.getImagesByPointId = async (req, res) => {
    try {
        //Obtiene el ID del punto de los parámetros de la ruta
        const { pointId } = req.params;
        //Busca todas las imagenes en la base de datos por el ID del punto
        const pointImage = await Images.findAll({ where: { pointId } });
        //Si se encuentran imagenes, devuelve una respuesta exitosa con las imagenes encontradas
        if (pointImage.length > 0) {
            res.status(200).json(pointImage);
        }
        else {
            //Si no se encuentran imagenes, devuelve una respuesta de error
            res.status(404).json({ error: 'No se encontraron imagenes para el punto especificado' });
        }
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las imagenes' });
    }
};

//Controlador para obtener una imagen por su ID
exports.getPointImageById = async (req, res) => {
    try {
        //Obtiene el ID de la imagen de los parámetros de la ruta
        const { id } = req.params;
        //Busca una imagen en la base de datos por su ID
        const pointImage = await Images.findByPk(id);
        //Si la imagen existe, devuelve una respuesta exitosa con la imagen encontrada
        if (pointImage) {
            res.status(200).json(pointImage);
        }
        else {
            //Si la imagen no existe, devuelve una respuesta de error
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la imagen' });
    }
};

//Controlador para actualizar una imagen por su ID
exports.updatePointImageById = async (req, res) => {
    try {
        //Obtiene el ID de la imagen de los parámetros de la ruta
        const { id } = req.params;
        //Obtiene los datos de la imagen del cuerpo de la solicitud
        const { pointId, imageUrl } = req.body;
        //Busca una imagen en la base de datos por su ID
        const pointImage = await Images.findByPk(id);
        //Si la imagen existe, actualiza la imagen y devuelve una respuesta exitosa
        if (pointImage) {
            await pointImage.update({
                imageUrl,
                pointId
            });
            res.status(200).json(pointImage);
        }
        else {
            //Si la imagen no existe, devuelve una respuesta de error
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la imagen' });
    }
};

//Controlador para eliminar una imagen por su ID
exports.deletePointImageById = async (req, res) => {
    try {
        //Obtiene el ID de la imagen de los parámetros de la ruta
        const { id } = req.params;
        //Busca una imagen en la base de datos por su ID
        const pointImage = await Images.findByPk(id);
        //Si la imagen existe, la elimina de la base de datos y devuelve una respuesta exitosa
        if (pointImage) {
            await pointImage.destroy();
            res.status(200).json({ message: 'Imagen eliminada correctamente' });
        }
        else {
            //Si la imagen no existe, devuelve una respuesta de error
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    }
    catch (error) {
        //Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
};


// Controlador para borrar todas las imágenes de un punto
exports.deleteImagesByPointId = async (req, res) => {
    try {
        // Obtiene el ID del punto de los parámetros de la ruta
        const { pointId } = req.params;

        // Busca y borra todas las imágenes en la base de datos por el ID del punto
        const deletedImagesCount = await Images.destroy({ where: { pointId } });

        if (deletedImagesCount > 0) {
            // Si se borraron imágenes, devuelve una respuesta exitosa
            res.status(200).json({ message: `${deletedImagesCount} imágenes borradas exitosamente` });
        } else {
            // Si no se encuentran imágenes para borrar, devuelve una respuesta de error
            res.status(404).json({ error: 'No se encontraron imágenes para el punto especificado' });
        }
    } catch (error) {
        // Si ocurre un error, devuelve una respuesta de error
        console.error(error);
        res.status(500).json({ error: 'Error al borrar las imágenes' });
    }
};