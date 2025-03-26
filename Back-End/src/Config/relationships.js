import Usuario from '../Models/UsuarioModel.js';
import Egresado from '../Models/EgresadoModel.js';
import Titulo from '../Models/TituloModel.js';
import Test from '../Models/TestModel.js';
import Pregunta from '../Models/PreguntaModel.js';
import Opcion from '../Models/OpcionModel.js';
import Habilidad from '../Models/HabilidadModel.js';
import HabilidadPregunta from '../Models/HabilidadPreguntaModel.js';
import RespuestaEgresado from '../Models/RespuestaEgresadoModel.js';
import EgresadoTitulo from '../Models/EgresadoTituloModel.js';
import Ubicacion from '../Models/UbicacionModel.js';
import Oferta from '../Models/OfertaModel.js';
import Empresa from '../Models/EmpresaModel.js';
import Inscripcion from '../Models/InscripcionModel.js';


Usuario.hasOne(Egresado, { foreignKey: 'id_usuario', as: 'egresado' });
Egresado.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

Egresado.belongsToMany(Titulo, { through: EgresadoTitulo, foreignKey: 'id_egresado', as: 'titulos' });
Titulo.belongsToMany(Egresado, { through: EgresadoTitulo, foreignKey: 'id_titulo', as: 'egresados' });

Egresado.belongsTo(Ubicacion, { foreignKey: 'id_residencia', as: 'ubicacion' });
Ubicacion.hasMany(Egresado, { foreignKey: 'id_residencia', as: 'egresados' });

Test.hasMany(Pregunta, { foreignKey: 'test_id', as: 'preguntas' });
Pregunta.belongsTo(Test, { foreignKey: 'test_id', as: 'test' });
Pregunta.hasMany(Opcion, { foreignKey: 'pregunta_id', as: 'opciones' });
Opcion.belongsTo(Pregunta, { foreignKey: 'pregunta_id', as: 'pregunta' });

Pregunta.belongsToMany(Habilidad, {
  through: HabilidadPregunta,
  foreignKey: 'pregunta_id',
  as: 'habilidades',
});

Habilidad.belongsToMany(Pregunta, {
  through: HabilidadPregunta,
  foreignKey: 'habilidad_id',
  as: 'preguntas',
});

RespuestaEgresado.belongsTo(Pregunta, {
  foreignKey: 'id_pregunta',
  as: 'pregunta'  
});


Empresa.hasMany(Oferta, { foreignKey: 'id_empresa', as: 'ofertas' });
Oferta.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
Oferta.belongsTo(Ubicacion, { foreignKey: 'id_ubicacion_oferta', as: 'ubicacion' });
Ubicacion.hasMany(Oferta, { foreignKey: 'id_ubicacion_oferta', as: 'ofertas' });


Oferta.hasMany(Inscripcion, { foreignKey: 'id_oferta', as: 'inscripciones' });
Inscripcion.belongsTo(Oferta, { foreignKey: 'id_oferta', as: 'oferta' });
Egresado.hasMany(Inscripcion, { foreignKey: 'id_egresado', as: 'inscripciones' });
Inscripcion.belongsTo(Egresado, { foreignKey: 'id_egresado', as: 'egresado' });

export {
  Empresa,
  Oferta,
  Ubicacion,
  Usuario,
  Egresado,
  Titulo,
  Test,
  Pregunta,
  Opcion,
  Habilidad,
  HabilidadPregunta,
  RespuestaEgresado,
  EgresadoTitulo,
  Inscripcion
};
