import Inscripcion from '../Models/InscripcionModel.js';
import Oferta from '../Models/OfertaModel.js';
import Egresado from '../Models/EgresadoModel.js';
import Empresa from '../Models/EmpresaModel.js';

export const inscribirOferta = async (req, res) => {
    const { id_egresado, id_oferta } = req.body;

    try {
        // Verificar si la oferta existe y está abierta
        const oferta = await Oferta.findOne({ where: { id: id_oferta, estado: 'A' } });
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta no encontrada o no está abierta para inscripciones' });
        }

        // Verificar si el egresado existe
        const egresado = await Egresado.findByPk(id_egresado);
        if (!egresado) {
            return res.status(404).json({ message: 'Egresado no encontrado' });
        }

        // Verificar si el egresado ya está inscrito en la oferta
        const inscripcionExistente = await Inscripcion.findOne({ where: { id_egresado, id_oferta } });
        if (inscripcionExistente) {
            return res.status(400).json({ message: 'El egresado ya está inscrito en esta oferta' });
        }

        // Crear la inscripción
        const nuevaInscripcion = await Inscripcion.create({
            id_oferta,
            id_egresado,
            fecha_inscripcion: new Date(),
            estado: 'Pendiente',
        });

        res.status(201).json({ message: 'Inscripción realizada exitosamente', inscripcion: nuevaInscripcion });
    } catch (error) {
        console.error('Error al realizar la inscripción:', error);
        res.status(500).json({ message: 'Error en el servidor al realizar la inscripción' });
    }
};

export const verInscripcionesEgresado = async (req, res) => {
    const { id_egresado } = req.params;

    try {
        // Verificar si el egresado existe
        const egresado = await Egresado.findByPk(id_egresado);
        if (!egresado) {
            return res.status(404).json({ message: 'Egresado no encontrado' });
        }

        // Obtener inscripciones del egresado
        const inscripciones = await Inscripcion.findAll({
            where: { id_egresado },
            include: [
                {
                    model: Oferta,
                    as: 'oferta',
                    attributes: ['cargo', 'fecha_publicacion', 'fecha_cierre'],
                    include: [
                        {
                            model: Empresa,
                            as: 'empresa',
                            attributes: ['nombre', 'logo'],
                        },
                    ],
                },
            ],
        });

        // Formatear la respuesta
        const resultado = inscripciones.map((inscripcion) => ({
            id: inscripcion.id,
            cargo: inscripcion.oferta.cargo,
            fecha_publicacion: inscripcion.oferta.fecha_publicacion,
            fecha_cierre: inscripcion.oferta.fecha_cierre,
            empresa: {
                nombre: inscripcion.oferta.empresa.nombre,
                logo: inscripcion.oferta.empresa.logo,
            },
            estado: inscripcion.estado,
        }));

        res.status(200).json({ inscripciones: resultado });
    } catch (error) {
        console.error('Error al obtener las inscripciones del egresado:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las inscripciones' });
    }
};

export const eliminarInscripcion = async (req, res) => {
    const { id_egresado, id_inscripcion } = req.params;

    try {
        // Verificar si la inscripción existe y pertenece al egresado
        const inscripcion = await Inscripcion.findOne({
            where: {
                id: id_inscripcion,
                id_egresado: id_egresado,
            },
        });

        if (!inscripcion) {
            return res.status(404).json({ message: 'Inscripción no encontrada o no pertenece al egresado' });
        }

        // Eliminar la inscripción
        await inscripcion.destroy();

        res.status(200).json({ message: 'Inscripción eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la inscripción:', error);
        res.status(500).json({ message: 'Error en el servidor al eliminar la inscripción' });
    }
};

export const verEgresadosPostulados = async (req, res) => {
  const { id_empresa, id_oferta } = req.params;

  try {
    // Verificar si la empresa es dueña de la oferta
    const oferta = await Oferta.findOne({
      where: { id: id_oferta, id_empresa },
    });

    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada o no pertenece a la empresa especificada' });
    }

    // Obtener las inscripciones de la oferta con los datos de los egresados
    const inscripciones = await Inscripcion.findAll({
      where: { id_oferta },
      include: {
        model: Egresado,
        as: 'egresado',
        attributes: ['nombres', 'apellidos', 'codigo_estudiante', 'telefono', 'genero', 'fecha_nacimiento'],
      },
    });

    if (inscripciones.length === 0) {
      return res.status(200).json({ message: 'No hay egresados postulados a esta oferta' });
    }

    res.status(200).json({ inscripciones });
  } catch (error) {
    console.error('Error al obtener los egresados postulados:', error);
    res.status(500).json({ message: 'Error al obtener los egresados postulados' });
  }
};
