CREATE DATABASE TalentoECundi;
USE TalentoECundi;

-- Entidades fuertes
CREATE TABLE Rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Ubicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ciudad INT NOT NULL,
    id_departamento INT NOT NULL,
    direccion VARCHAR(100) NOT NULL
);

CREATE TABLE Titulo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT NOT NULL,
    codigo VARCHAR(450) NOT NULL,
    categoria TEXT NOT NULL
);

CREATE TABLE Modalidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tiempo_minutos INT NOT NULL
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(20) NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Rol(id)
);

-- Entidades relacionadas
CREATE TABLE Egresado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    codigo_estudiante VARCHAR(20) NOT NULL,
    documento VARCHAR(20) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    id_residencia INT,
    genero VARCHAR(1),
    fecha_nacimiento DATETIME,
    ano_graduacion INT,
    imagen_perfil LONGBLOB,
    curriculum LONGBLOB,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (id_residencia) REFERENCES Ubicacion(id)
);

CREATE TABLE Empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nit VARCHAR(30) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    correo_contacto VARCHAR(100) NOT NULL,
    pagina_web VARCHAR(100) NOT NULL,
    descripcion TEXT,
    logo LONGBLOB,
    banner LONGBLOB,
    id_ubicacion_empresa INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
    FOREIGN KEY (id_ubicacion_empresa) REFERENCES Ubicacion(id)
);

CREATE TABLE Oferta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    cargo VARCHAR(60) NOT NULL,
    id_modalidad INT NOT NULL,
    id_ubicacion_oferta INT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    fecha_cierre DATETIME NOT NULL, 
    estado VARCHAR(1) NOT NULL,
    salario DECIMAL(18, 2) NOT NULL,
    tipo_contrato VARCHAR(20) NOT NULL,
    experiencia_requerida VARCHAR(100) NOT NULL,
    hora_trabajo TEXT NOT NULL,
    vacantes_disponibles INT NOT NULL,
    habilidades VARCHAR(100),
    idiomas VARCHAR(100),
    FOREIGN KEY (id_empresa) REFERENCES Empresa(id),
    FOREIGN KEY (id_modalidad) REFERENCES Modalidad(id),
    FOREIGN KEY (id_ubicacion_oferta) REFERENCES Ubicacion(id)
);

CREATE TABLE Habilidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE Pregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT NOT NULL,
    imagen LONGBLOB,
    test_id INT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES Test(id)
);

CREATE TABLE Opcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT NOT NULL,
    respuesta BOOLEAN NOT NULL,
    pregunta_id INT NOT NULL,
    FOREIGN KEY (pregunta_id) REFERENCES Pregunta(id)
);

-- Entidades débiles
CREATE TABLE Egresado_Titulo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_egresado INT NOT NULL,
    id_titulo INT NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_egresado) REFERENCES Egresado(id),
    FOREIGN KEY (id_titulo) REFERENCES Titulo(id)
);

CREATE TABLE Inscripcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_oferta INT NOT NULL,
    id_egresado INT NOT NULL,
    fecha_inscripcion DATETIME NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_oferta) REFERENCES Oferta(id),
    FOREIGN KEY (id_egresado) REFERENCES Egresado(id)
);

CREATE TABLE Notificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    mensaje VARCHAR(150) NOT NULL,
    fecha TEXT NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);


CREATE TABLE TestEgresado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    egresado_id INT NOT NULL,
    test_id INT NOT NULL,
    TotalCorrectas INT NOT NULL,
    precision_test DECIMAL(4, 2) NOT NULL,
    puntaje DECIMAL(4, 2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    estado TEXT NOT NULL,
    FOREIGN KEY (egresado_id) REFERENCES Egresado(id),
    FOREIGN KEY (test_id) REFERENCES Test(id)
);

CREATE TABLE RespuestaEgresado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_test_egresado INT NOT NULL,
    id_pregunta INT NOT NULL,
    id_opcion_respuesta INT NOT NULL,
    FOREIGN KEY (id_test_egresado) REFERENCES TestEgresado(id),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id),
    FOREIGN KEY (id_opcion_respuesta) REFERENCES Opcion(id)
);


CREATE TABLE HabilidadPregunta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habilidad_id INT NOT NULL,
    pregunta_id INT NOT NULL,
    FOREIGN KEY (habilidad_id) REFERENCES Habilidad(id),
    FOREIGN KEY (pregunta_id) REFERENCES Pregunta(id)
);

-- Inserciones por defecto
INSERT INTO `rol` (`id`, `nombre`) VALUES (NULL, 'Egresado'), (NULL, 'Empresa');

INSERT INTO `habilidad` (`id`, `nombre`) VALUES (NULL, '.NET '), (NULL, 'API'), (NULL, 'Javascript'),
(NULL, 'Metodologías Agiles'), (NULL, 'Matemáticas '), (NULL, 'Nuevas tecnologías'), (NULL, 'Análisis de datos'), (NULL, 'Programación');

INSERT INTO `titulo` (`id`, `nombre`, `codigo`, `categoria`) VALUES 
(NULL, 'Administración de Empresas', '101', 'Pregrado'), 
(NULL, 'Contaduría Pública', '102', 'Pregrado'), 
(NULL, 'Ingeniería Agronómica', '103', 'Pregrado'), 
(NULL, 'Ingeniería Ambiental', '104', 'Pregrado'), 
(NULL, 'Zootecnia', '105', 'Pregrado'), 
(NULL, 'Ciencias del Deporte y la Educación Física', '106', 'Pregrado'), 
(NULL, 'Licenciatura en Ciencias Sociales', '107', 'Pregrado'), 
(NULL, 'Ingeniería de Sistemas', '108', 'Pregrado'), 
(NULL, 'Ingeniería Electrónica', '109', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Básica con Énfasis en Humanidades e Idiomas', '110', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Básica con Énfasis en Matemáticas', '111', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Básica con Énfasis en Ciencias Naturales y Educación Ambiental', '112', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Básica con Énfasis en Educación Artística', '113', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Básica con Énfasis en Educación Física, Recreación y Deportes', '114', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Infantil', '115', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Preescolar', '116', 'Pregrado'), 
(NULL, 'Licenciatura en Educación Especial', '117', 'Pregrado'), 
(NULL, 'Licenciatura en Educación para la Primera Infancia', '118', 'Pregrado'), 
(NULL, 'Licenciatura en Educación para la Inclusión', '119', 'Pregrado'), 
(NULL, 'Licenciatura en Educación para la Diversidad', '120', 'Pregrado'), 
(NULL, 'Maestría en Educación', '201', 'Posgrado'), 
(NULL, 'Maestría en Gestión Ambiental', '202', 'Posgrado'), 
(NULL, 'Especialización en Gerencia de Proyectos', '203', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Calidad y Auditoría en Salud', '204', 'Posgrado'), 
(NULL, 'Especialización en Gerencia de Servicios de Salud', '205', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Seguridad y Salud en el Trabajo', '206', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Tecnología Educativa', '207', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Innovación', '208', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Calidad en la Educación Superior', '209', 'Posgrado'), 
(NULL, 'Especialización en Gestión de la Responsabilidad Social Empresarial', '210', 'Posgrado');

