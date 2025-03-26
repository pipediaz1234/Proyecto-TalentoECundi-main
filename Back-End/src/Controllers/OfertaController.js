import Oferta from '../Models/OfertaModel.js';
import Ubicacion from '../Models/UbicacionModel.js';
import Empresa from '../Models/EmpresaModel.js';
import Inscripcion from '../Models/InscripcionModel.js';
import Egresado from '../Models/EgresadoModel.js';

import { Op } from 'sequelize';

export const crearOferta = async (req, res) => {
    const {
        id_empresa,
        cargo,
        ciudad,
        departamento,
        direccion,
        id_modalidad,
        descripcion,
        fecha_cierre,
        estado,
        salario,
        tipo_contrato,
        experiencia_requerida,
        hora_trabajo,
        vacantes_disponibles,
        habilidades,
        idiomas,
    } = req.body;

    try {
        // Crear nueva ubicación
        const nuevaUbicacion = await Ubicacion.create({
            ciudad,
            departamento,
            direccion,
        });

        // Crear nueva oferta de empleo con la fecha de publicación actual
        const nuevaOferta = await Oferta.create({
            id_empresa,
            cargo,
            id_ubicacion_oferta: nuevaUbicacion.id,
            id_modalidad,
            descripcion,
            fecha_publicacion: new Date(),
            fecha_cierre,
            estado: 'A',
            salario,
            tipo_contrato,
            experiencia_requerida,
            hora_trabajo,
            vacantes_disponibles,
            habilidades,
            idiomas,
        });

        res.status(201).json({ message: 'Oferta de empleo creada exitosamente', oferta: nuevaOferta });
    } catch (error) {
        console.error('Error al crear oferta de empleo:', error);
        res.status(500).json({ message: 'Error al crear la oferta de empleo' });
    }
};

export const verPublicacionesPorEmpresa = async (req, res) => {
    const { id_empresa } = req.params;

    try {
        
        const ofertas = await Oferta.findAll({
            where: { id_empresa },
            include: [
                {
                    model: Ubicacion,
                    as: 'ubicacion',
                }
            ]
        });

        if (ofertas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron publicaciones de empleo para esta empresa.' });
        }

        res.status(200).json({ message: 'Publicaciones de empleo obtenidas exitosamente', ofertas });
    } catch (error) {
        console.error('Error al obtener las publicaciones de empleo:', error);
        res.status(500).json({ message: 'Error al obtener las publicaciones de empleo' });
    }
};

export const editarOferta = async (req, res) => {
    const { id, id_empresa } = req.params;
    const {
        cargo,
        ciudad,
        departamento,
        direccion,
        id_modalidad,
        descripcion,
        fecha_cierre,
        estado,
        salario,
        tipo_contrato,
        experiencia_requerida,
        hora_trabajo,
        vacantes_disponibles,
        habilidades,
        idiomas,
    } = req.body;

    try {
        // Buscar la oferta que pertenece a la empresa especificada
        const oferta = await Oferta.findOne({ where: { id, id_empresa } });
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta de empleo no encontrada o no pertenece a la empresa' });
        }

        // Actualizar la ubicación relacionada si se proporcionan nuevos valores
        if (ciudad && departamento && direccion) {
            const ubicacionExistente = await Ubicacion.findByPk(oferta.id_ubicacion_oferta);
            if (ubicacionExistente) {
                await ubicacionExistente.update({
                    ciudad,
                    departamento,
                    direccion,
                });
            }
        }

        // Actualizar los datos de la oferta
        await oferta.update({
            cargo: cargo || oferta.cargo,
            id_modalidad: id_modalidad || oferta.id_modalidad,
            descripcion: descripcion || oferta.descripcion,
            fecha_cierre: fecha_cierre || oferta.fecha_cierre,
            estado: estado || oferta.estado,
            salario: salario || oferta.salario,
            tipo_contrato: tipo_contrato || oferta.tipo_contrato,
            experiencia_requerida: experiencia_requerida || oferta.experiencia_requerida,
            hora_trabajo: hora_trabajo || oferta.hora_trabajo,
            vacantes_disponibles: vacantes_disponibles || oferta.vacantes_disponibles,
            habilidades: habilidades || oferta.habilidades,
            idiomas: idiomas || oferta.idiomas,
        });

        res.status(200).json({ message: 'Oferta de empleo actualizada correctamente', oferta });
    } catch (error) {
        console.error('Error al editar oferta de empleo:', error);
        res.status(500).json({ message: 'Error al editar la oferta de empleo' });
    }
};

export const eliminarOferta = async (req, res) => {
    const { id, id_empresa } = req.params;

    try {
        // Buscar la oferta que pertenece a la empresa especificada
        const oferta = await Oferta.findOne({ where: { id, id_empresa } });
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta de empleo no encontrada o no pertenece a la empresa' });
        }

        // Eliminar la oferta
        await oferta.destroy();

        res.status(200).json({ message: 'Oferta de empleo eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar oferta de empleo:', error);
        res.status(500).json({ message: 'Error al eliminar la oferta de empleo' });
    }
};

export const cerrarOferta = async (req, res) => {
    const { id_empresa, id_oferta } = req.params;

    try {
        const oferta = await Oferta.findOne({
            where: {
                id: id_oferta,
                id_empresa,
            },
        });

        // Validar si la oferta existe y pertenece a la empresa indicada
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta de empleo no encontrada o no pertenece a la empresa indicada' });
        }

        // Actualizar el estado de la oferta a "C" (Cerrado)
        await oferta.update({
            estado: 'C',
        });

        res.status(200).json({ message: 'La oferta de empleo ha sido cerrada exitosamente' });
    } catch (error) {
        console.error('Error al cerrar la oferta de empleo:', error);
        res.status(500).json({ message: 'Error al cerrar la oferta de empleo' });
    }
};

export const verPublicacionesGenerales = async (req, res) => {
    try {
        const ofertas = await Oferta.findAll({
            where: { estado: 'A' }, // Filtrar ofertas abiertas (estado A)
            include: [
                {
                    model: Empresa,
                    as: 'empresa',
                    attributes: ['nombre', 'logo'],
                },
            ],
            order: [['fecha_publicacion', 'DESC']],
        });

        res.status(200).json({ ofertas });
    } catch (error) {
        console.error('Error al obtener las ofertas de empleo:', error);
        res.status(500).json({ message: 'Error al obtener las ofertas de empleo' });
    }
};

export const filtrarOfertas = async (req, res) => {
    const { salario_minimo, salario_maximo, id_modalidad, tipo_contrato, hora_trabajo, habilidades } = req.query;

    try {
        // Definir los filtros dinámicos
        const filtros = {};

        if (salario_minimo) {
            filtros.salario = { [Op.gte]: salario_minimo };
        }

        if (salario_maximo) {
            filtros.salario = { ...filtros.salario, [Op.lte]: salario_maximo };
        }

        if (id_modalidad) {
            filtros.id_modalidad = id_modalidad;
        }

        if (tipo_contrato) {
            filtros.tipo_contrato = tipo_contrato;
        }

        if (hora_trabajo) {
            filtros.hora_trabajo = { [Op.like]: `%${hora_trabajo}%` };
        }

        if (habilidades) {
            filtros.habilidades = { [Op.like]: `%${habilidades}%` };
        }

        // Buscar ofertas con los filtros aplicados
        const ofertas = await Oferta.findAll({
            where: {
                estado: 'A', 
                ...filtros,
            },
            include: {
                model: Empresa,
                as: 'empresa',
                attributes: ['nombre', 'logo'],
            },
            order: [['fecha_publicacion', 'DESC']],
        });

        res.status(200).json(ofertas);
    } catch (error) {
        console.error('Error al filtrar ofertas de empleo:', error);
        res.status(500).json({ message: 'Error al filtrar las ofertas de empleo' });
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
                attributes: ['id','nombres', 'apellidos', 'codigo_estudiante', 'telefono', 'genero', 'fecha_nacimiento', 'imagen_perfil'],
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

export const rechazarPostulacion = async (req, res) => {
    const { id_inscripcion } = req.params;

    try {
        // Buscar la inscripción por el ID
        const inscripcion = await Inscripcion.findByPk(id_inscripcion);

        if (!inscripcion) {
            return res.status(404).json({ message: 'No se encontró la inscripción.' });
        }

        // Actualizar el estado de la inscripción a 'Rechazada'
        inscripcion.estado = 'Rechazada';
        await inscripcion.save();

        res.status(200).json({ message: 'Postulación rechazada exitosamente.' });
    } catch (error) {
        console.error('Error al rechazar la postulación:', error);
        res.status(500).json({ message: 'Error al rechazar la postulación.' });
    }
};

export const pasarSegundaFase = async (req, res) => {
    const { id_inscripcion } = req.params;

    try {
        // Buscar la inscripción por el ID
        const inscripcion = await Inscripcion.findByPk(id_inscripcion);

        if (!inscripcion) {
            return res.status(404).json({ message: 'No se encontró la inscripción.' });
        }

        // Actualizar el estado de la inscripción a 'En segunda fase'
        inscripcion.estado = 'En segunda fase';
        await inscripcion.save();

        res.status(200).json({ message: 'Egresado pasado a segunda fase exitosamente.' });
    } catch (error) {
        console.error('Error al pasar a segunda fase:', error);
        res.status(500).json({ message: 'Error al pasar a segunda fase.' });
    }
};