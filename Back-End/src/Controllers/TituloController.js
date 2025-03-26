import Titulo from '../Models/TituloModel.js';

export const obtenerTitulos = async (req, res) => {
  // Método para obtener todos los títulos
    try {
      const titulos = await Titulo.findAll();
      res.status(200).json(titulos);
    } catch (error) {
      console.error('Error al obtener los títulos:', error);
      res.status(500).json({ error: 'Hubo un error al obtener los títulos' });
    }
  
};

