import Test from '../Models/TestModel.js';
import Pregunta from '../Models/PreguntaModel.js';
import Opcion from '../Models/OpcionModel.js';
import Habilidad from '../Models/HabilidadModel.js';
import HabilidadPregunta from '../Models/HabilidadPreguntaModel.js';
import TestEgresado from '../Models/TestEgresadoModel.js';
import RespuestaEgresado from '../Models/RespuestaEgresadoModel.js';
import sequelize from '../Config/connection.js';

export const crearTestConPreguntas = async (req, res) => {
  const { nombre, tiempo_minutos, preguntas } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Crear el test
    const test = await Test.create({ nombre, tiempo_minutos }, { transaction });

    // Recorrer las preguntas para crearlas
    for (const preguntaData of preguntas) {
      const { contenido, imagen, opciones, habilidades } = preguntaData;

      // Crear la pregunta
      const pregunta = await Pregunta.create(
        { contenido, imagen, test_id: test.id },
        { transaction }
      );

      // Crear las opciones para la pregunta
      for (const opcionData of opciones) {
        await Opcion.create(
          { contenido: opcionData.contenido, respuesta: opcionData.respuesta, pregunta_id: pregunta.id },
          { transaction }
        );
      }

      // Asociar habilidades a la pregunta
      for (const habilidadId of habilidades) {
        await HabilidadPregunta.create(
          { habilidad_id: habilidadId, pregunta_id: pregunta.id },
          { transaction }
        );
      }
    }

    // Confirmar la transacción
    await transaction.commit();

    res.status(201).json({ message: 'Test creado exitosamente', test });
  } catch (error) {
    // Revertir en caso de error
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error creando el test', error });
  }
};

export const obtenerTestConDetalles = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Test.findOne({
      where: { id },
      include: [
        {
          model: Pregunta,
          as: 'preguntas',
          include: [
            {
              model: Opcion,
              as: 'opciones',
            },
            {
              model: Habilidad,
              as: 'habilidades',
              through: {
                model: HabilidadPregunta,
                attributes: []
              }
            }
          ]
        }
      ]
    });

    if (!test) {
      return res.status(404).json({ message: 'Test no encontrado' });
    }

    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el test', error });
  }
};

export const agregarPreguntas = async (req, res) => {
  const { test_id, preguntas } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Buscar si el test existe
    const test = await Test.findByPk(test_id);
    if (!test) {
      return res.status(404).json({ message: 'El test no existe' });
    }

    // Recorrer las nuevas preguntas para agregarlas al test
    for (const preguntaData of preguntas) {
      const { contenido, imagen, opciones, habilidades } = preguntaData;

      // Crear la nueva pregunta asociada al test
      const pregunta = await Pregunta.create(
        { contenido, imagen, test_id: test.id },
        { transaction }
      );

      // Crear las opciones para la pregunta
      for (const opcionData of opciones) {
        await Opcion.create(
          { contenido: opcionData.contenido, respuesta: opcionData.respuesta, pregunta_id: pregunta.id },
          { transaction }
        );
      }

      // Asociar habilidades a la pregunta
      for (const habilidadId of habilidades) {
        await HabilidadPregunta.create(
          { habilidad_id: habilidadId, pregunta_id: pregunta.id },
          { transaction }
        );
      }
    }

    // Confirmar la transacción
    await transaction.commit();

    res.status(201).json({ message: 'Preguntas agregadas exitosamente', test });
  } catch (error) {
    // Revertir en caso de error
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error agregando preguntas', error });
  }
};

export const guardarYCalcularRespuestas = async (req, res) => {
  const { test_id } = req.params;
  const { egresado_id, respuestas } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Crear el registro en TestEgresado para este egresado
    const fecha_inicio = new Date();

    // Establecer fecha_fin como 3 meses después de la fecha de inicio
    const fecha_fin = new Date();
    fecha_fin.setMonth(fecha_fin.getMonth() + 3); // Sumar 3 meses

    const testEgresado = await TestEgresado.create({
      egresado_id,
      test_id,
      TotalCorrectas: 0,
      precision_test: 0,
      puntaje: 0,
      fecha_inicio,
      estado: 'iniciado',
    }, { transaction });

    // Obtener todas las preguntas del test
    const preguntasTest = await Pregunta.findAll({
      where: { test_id }
    });

    let totalPreguntas = preguntasTest.length;
    let totalCorrectas = 0;

    // Guardar todas las respuestas del egresado
    for (const respuesta of respuestas) {
      const { id_pregunta, id_opcion_respuesta } = respuesta;

      // Guardar la respuesta en RespuestaEgresado
      await RespuestaEgresado.create({
        id_test_egresado: testEgresado.id,
        id_pregunta,
        id_opcion_respuesta
      }, { transaction });

      // Verificar si la respuesta es correcta
      const opcionCorrecta = await Opcion.findOne({
        where: {
          id: id_opcion_respuesta,
          respuesta: true
        }
      });

      //console.log(`Pregunta: ${id_pregunta}, Respuesta seleccionada: ${id_opcion_respuesta}, Es correcta: ${!!opcionCorrecta}`);

      if (opcionCorrecta) {
        totalCorrectas++;
      }
    }

    // Calcular precisión y puntaje
    const precision_test = (totalCorrectas / totalPreguntas) * 100;
    const puntaje = parseFloat((precision_test / 2).toFixed(1));

    // Actualizar TestEgresado con los resultados finales
    await testEgresado.update({
      TotalCorrectas: totalCorrectas,
      precision_test,
      puntaje,
      fecha_fin,
      estado: 'finalizado'
    }, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    res.status(201).json({
      message: 'Respuestas guardadas y resultados calculados exitosamente',
      totalPreguntas,
      totalCorrectas,
      precision_test,
      puntaje,
      fecha_fin
    });
  } catch (error) {
    // Revertir en caso de error
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al guardar respuestas o calcular resultados', error });
  }
};

export const obtenerResultadosConHabilidades = async (req, res) => {
  const { id_egresado } = req.params;

  try {
    // Buscar el test asociado al egresado
    const testEgresado = await TestEgresado.findOne({
      where: { egresado_id: id_egresado },
      attributes: ['id', 'TotalCorrectas', 'precision_test', 'puntaje', 'fecha_fin'],
    });

    // Si no se encuentra el test, retornar un mensaje de error
    if (!testEgresado) {
      return res.status(404).json({ message: 'No se encontró un test para este egresado.' });
    }

    const id_test_egresado = testEgresado.id;

    // Obtener las respuestas del egresado junto con las preguntas, habilidades y opciones correctas
    const respuestas = await RespuestaEgresado.findAll({
      where: { id_test_egresado: id_test_egresado },
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
    });

    // Calcular totales y habilidades
    const totalPreguntas = respuestas.length;
    const habilidadesMap = {};
    const respuestasDetalle = [];

    for (const respuesta of respuestas) {
      const pregunta = respuesta.pregunta;

      // Encontrar la opción correcta de la pregunta
      const opcionCorrecta = pregunta.opciones.find(opcion => opcion.respuesta === true);

      // Encontrar la opción seleccionada por el egresado
      const opcionSeleccionada = pregunta.opciones.find(opcion => opcion.id === respuesta.id_opcion_respuesta);

      // Verificar si la respuesta seleccionada por el egresado es correcta
      const esCorrecta = opcionCorrecta && opcionCorrecta.id === respuesta.id_opcion_respuesta;

      // Almacenar el detalle de la respuesta del egresado
      respuestasDetalle.push({
        id_pregunta: pregunta.id,
        contenido_pregunta: pregunta.contenido,
        id_opcion_seleccionada: respuesta.id_opcion_respuesta,
        es_correcta: esCorrecta,
        contenido_opcion_seleccionada: opcionSeleccionada ? opcionSeleccionada.contenido : null,
        contenido_opcion_correcta: opcionCorrecta ? opcionCorrecta.contenido : null,
        habilidades: pregunta.habilidades.map(habilidad => habilidad.nombre),
      });

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

    // Retornar los resultados con el resultado del test y los detalles de las respuestas
    res.status(200).json({
      totalPreguntas,
      resultadoTest: testEgresado,
      habilidades: habilidadesConPorcentaje,
      respuestasDetalle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los resultados', error });
  }
};




