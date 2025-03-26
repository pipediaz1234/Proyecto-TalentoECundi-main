import Egresado from '../Models/EgresadoModel.js';
import EgresadoTitulo from '../Models/EgresadoTituloModel.js';
import Ubicacion from '../Models/UbicacionModel.js';
import Pregunta from '../Models/PreguntaModel.js';
import Opcion from '../Models/OpcionModel.js';
import Habilidad from '../Models/HabilidadModel.js';
import TestEgresado from '../Models/TestEgresadoModel.js';
import RespuestaEgresado from '../Models/RespuestaEgresadoModel.js';
import Usuario from '../Models/UsuarioModel.js';
import Titulo from '../Models/TituloModel.js';

export const actualizarPerfilEgresado = async (req, res) => {
  const { id } = req.params;
  const {
    nombres,
    apellidos,
    documento,
    codigo_estudiante,
    fecha_nacimiento,
    genero,
    ano_graduacion,
    telefono,
    ciudad,
    departamento,
    direccion,
    titulos,
    imagen_perfil,
    curriculum
  } = req.body;

  console.log(req.body);

  try {
    // Buscar el egresado 
    const egresado = await Egresado.findByPk(id);
    if (!egresado) {
      return res.status(404).json({ message: 'Egresado no encontrado' });
    }

    // Manejo de la ubicación
    let id_residencia = egresado.id_residencia;

    if (ciudad && departamento && direccion) {
      
      if (id_residencia) {
        // Si ya existe una ubicación, actualizarla
        const ubicacionExistente = await Ubicacion.findByPk(id_residencia);
        if (ubicacionExistente) {
          await ubicacionExistente.update({
            ciudad,
            departamento,
            direccion
          });
        }
      } else {
        // Si no existe una ubicación, crear una nueva
        const nuevaUbicacion = await Ubicacion.create({
          ciudad,
          departamento,
          direccion
        });
        id_residencia = nuevaUbicacion.id; 
      }
    }

    // Actualizar los datos de Egresado
    await egresado.update({
      nombres: nombres || egresado.nombres,
      apellidos: apellidos || egresado.apellidos,
      documento: documento || egresado.documento,
      codigo_estudiante: codigo_estudiante || egresado.codigo_estudiante,
      fecha_nacimiento: fecha_nacimiento || egresado.fecha_nacimiento,
      genero: genero || egresado.genero,
      ano_graduacion: ano_graduacion || egresado.ano_graduacion,
      telefono: telefono || egresado.telefono,
      id_residencia: id_residencia || egresado.id_residencia, 
      imagen_perfil: imagen_perfil || egresado.imagen_perfil,
      curriculum: curriculum || egresado.curriculum
    });

    // Manejo de los títulos
    if (titulos && titulos.length > 0) {
      for (const titulo of titulos) {
        // Verificar si ya existe una relación entre el egresado y el título
        const egresadoTituloExistente = await EgresadoTitulo.findOne({
          where: {
            id_egresado: egresado.id,
            id_titulo: titulo.id_titulo
          }
        });

        if (egresadoTituloExistente) {
          // Actualizar el estado si ya existe la relación
          await egresadoTituloExistente.update({
            estado: titulo.estado
          });
        } else {
          // Crear una nueva relación si no existe
          await EgresadoTitulo.create({
            id_egresado: egresado.id,
            id_titulo: titulo.id_titulo,
            estado: titulo.estado
          });
        }
      }
    }

    res.status(200).json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al actualizar el perfil' });
  }
};

export const obtenerPerfilYResultadosEgresado = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el perfil del egresado
    const egresado = await Egresado.findOne({
      where: { id: id },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['correo'],
        },
        {
          model: Titulo,
          as: 'titulos',
          attributes: ['nombre'],
          through: {
            model: EgresadoTitulo, 
            attributes: ['estado'], 
          },
        },
      ],
    });

    // Si no se encuentra el egresado, retornar un mensaje de error
    if (!egresado) {
      return res.status(404).json({ message: 'No se encontró el egresado.' });
    }

    // Buscar el test asociado al egresado
    const testEgresado = await TestEgresado.findOne({
      where: { egresado_id: id },
      attributes: ['id', 'TotalCorrectas', 'precision_test', 'puntaje', 'fecha_fin'],
    });

    // Si no se encuentra el test, establecerlo en null
    const resultadoTest = testEgresado ? testEgresado : null;

    // Obtener las respuestas del egresado junto con las preguntas, habilidades y opciones correctas
    const respuestas = resultadoTest
      ? await RespuestaEgresado.findAll({
          where: { id_test_egresado: resultadoTest.id },
          include: [
            {
              model: Pregunta,
              as: 'pregunta',
              include: [
                {
                  model: Habilidad,
                  as: 'habilidades',
                },
                {
                  model: Opcion,
                  as: 'opciones',
                },
              ],
            },
          ],
        })
      : [];

    // Calcular totales y habilidades
    const totalPreguntas = respuestas.length;
    const habilidadesMap = {};

    for (const respuesta of respuestas) {
      const pregunta = respuesta.pregunta;

      // Encontrar la opción correcta de la pregunta
      const opcionCorrecta = pregunta.opciones.find(opcion => opcion.respuesta === true);

  
      // Verificar si la respuesta seleccionada por el egresado es correcta
      const esCorrecta = opcionCorrecta && opcionCorrecta.id === respuesta.id_opcion_respuesta;

      if (esCorrecta) {
        // Incrementar el conteo de habilidades si la respuesta es correcta
        pregunta.habilidades.forEach(habilidadRel => {
          const habilidadId = habilidadRel.id;
          habilidadesMap[habilidadId] = habilidadesMap[habilidadId] || { correctas: 0, total: 0 };
          habilidadesMap[habilidadId].correctas++;
        });
      }

      // Contar el total de habilidades relacionadas
      pregunta.habilidades.forEach(habilidadRel => {
        const habilidadId = habilidadRel.id;
        habilidadesMap[habilidadId] = habilidadesMap[habilidadId] || { correctas: 0, total: 0 };
        habilidadesMap[habilidadId].total++;
      });
    }

    // Calcular porcentajes
    const habilidadesConPorcentaje = await Promise.all(
      Object.entries(habilidadesMap).map(async ([id, { correctas, total }]) => {
        const habilidad = await Habilidad.findOne({ where: { id } });
        return {
          habilidad_id: id,
          nombre: habilidad ? habilidad.nombre : null,
          porcentaje: Math.round((correctas / total) * 100) || 0,
        };
      })
    );

    // Retornar los detalles del egresado con los resultados del test y los detalles de las respuestas
    res.status(200).json({
      perfil: {
        nombre_completo: `${egresado.nombres} ${egresado.apellidos}`,
        correo: egresado.usuario.correo,
        telefono: egresado.telefono,
        documento: egresado.documento,
        sexo: egresado.genero,
        fecha_nacimiento: egresado.fecha_nacimiento,
        ano_graduacion: egresado.ano_graduacion,
        titulos: egresado.titulos.length ? egresado.titulos : null,
      },
      resumenTest: {
        totalPreguntas,
        resultadoTest,
        habilidades: habilidadesConPorcentaje,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los detalles del egresado y los resultados del test', error });
  }
};

export const obtenerPerfilEgresado = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el perfil del egresado
    const egresado = await Egresado.findOne({
      where: { id: id },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['correo'],
        },
        {
          model: Titulo,
          as: 'titulos',
          attributes: ['nombre'],
          through: {
            model: EgresadoTitulo,
            as: 'egresadotitulo',
            attributes: ['estado'],
          },
        },
        {
          model: Ubicacion,
          as: 'ubicacion',
          attributes: ['ciudad', 'departamento', 'direccion'],
        },
      ],
    });

    // Si no se encuentra el egresado, retornar un mensaje de error
    if (!egresado) {
      return res.status(404).json({ message: 'No se encontró el egresado.' });
    }

    // Formatear los datos del perfil
    const perfilEgresado = {
      nombres: egresado.nombres,
      apellidos: egresado.apellidos,
      documento: egresado.documento,
      codigo_estudiante: egresado.codigo_estudiante,
      fecha_nacimiento: egresado.fecha_nacimiento,
      genero: egresado.genero,
      ano_graduacion: egresado.ano_graduacion,
      telefono: egresado.telefono,
      ciudad: egresado.ubicacion ? egresado.ubicacion.ciudad : null,
      departamento: egresado.ubicacion ? egresado.ubicacion.departamento : null,
      direccion: egresado.ubicacion ? egresado.ubicacion.direccion : null,
      imagen_perfil: egresado.imagen_perfil,
      curriculum: egresado.curriculum,
      titulos: egresado.titulos.length
        ? egresado.titulos.map(titulo => (
          {
            id_titulo: titulo.id,
            nombre: titulo.nombre,
            estado: titulo.egresadotitulo.estado || null,
          }))
        : null,
    };

    res.status(200).json(perfilEgresado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los detalles del egresado', error });
  }
};







