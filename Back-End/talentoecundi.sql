-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 23:27:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `talentoecundi`
--
CREATE DATABASE IF NOT EXISTS `talentoecundi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `talentoecundi`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresado`
--

CREATE TABLE `egresado` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `codigo_estudiante` varchar(20) NOT NULL,
  `documento` varchar(20) DEFAULT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `id_residencia` int(11) DEFAULT NULL,
  `genero` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `ano_graduacion` int(11) DEFAULT NULL,
  `imagen_perfil` longblob DEFAULT NULL,
  `curriculum` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresado_titulo`
--

CREATE TABLE `egresado_titulo` (
  `id` int(11) NOT NULL,
  `id_egresado` int(11) NOT NULL,
  `id_titulo` int(11) NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nit` varchar(30) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo_contacto` varchar(100) DEFAULT NULL,
  `pagina_web` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `logo` longblob DEFAULT NULL,
  `banner` longblob DEFAULT NULL,
  `id_ubicacion_empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidad`
--

CREATE TABLE `habilidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habilidad`
--

INSERT INTO `habilidad` (`id`, `nombre`) VALUES
(1, '.NET '),
(2, 'API'),
(3, 'Javascript'),
(4, 'Metodologías Agiles'),
(5, 'Matemáticas '),
(6, 'Nuevas tecnologías'),
(7, 'Análisis de datos'),
(8, 'Programación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidadpregunta`
--

CREATE TABLE `habilidadpregunta` (
  `id` int(11) NOT NULL,
  `habilidad_id` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habilidadpregunta`
--

INSERT INTO `habilidadpregunta` (`id`, `habilidad_id`, `pregunta_id`) VALUES
(1, 8, 2),
(2, 5, 3),
(3, 8, 3),
(4, 5, 4),
(5, 8, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `id` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL,
  `id_egresado` int(11) NOT NULL,
  `fecha_inscripcion` datetime NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE `modalidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `mensaje` varchar(150) NOT NULL,
  `fecha` text NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `cargo` varchar(60) NOT NULL,
  `id_modalidad` int(11) NOT NULL,
  `id_ubicacion_oferta` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `fecha_cierre` datetime NOT NULL,
  `estado` varchar(1) NOT NULL,
  `salario` decimal(18,2) NOT NULL,
  `tipo_contrato` varchar(20) NOT NULL,
  `experiencia_requerida` varchar(100) NOT NULL,
  `hora_trabajo` text NOT NULL,
  `vacantes_disponibles` int(11) NOT NULL,
  `habilidades` varchar(100) DEFAULT NULL,
  `idiomas` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcion`
--

CREATE TABLE `opcion` (
  `id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `respuesta` tinyint(1) NOT NULL,
  `pregunta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opcion`
--

INSERT INTO `opcion` (`id`, `contenido`, `respuesta`, `pregunta_id`) VALUES
(4, 'La capacidad de un objeto de tomar múltiples formas', 1, 2),
(5, 'Una forma de reutilización de código', 0, 2),
(6, 'Un tipo de algoritmo', 0, 2),
(7, '2x', 1, 3),
(8, 'x', 0, 3),
(9, 'x^2', 0, 3),
(10, '3.14', 1, 4),
(11, '4.00', 0, 4),
(12, 'Un bloque de código que realiza una tarea', 1, 5),
(13, 'Una variable que almacena datos', 0, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `imagen` longblob DEFAULT NULL,
  `test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `contenido`, `imagen`, `test_id`) VALUES
(2, '¿Qué significa \'polimorfismo\' en programación orientada a objetos?', NULL, 2),
(3, '¿Cuál es el resultado de la derivada de x^2?', NULL, 2),
(4, '¿Cuál es el valor de pi?', NULL, 2),
(5, '¿Qué es una función en programación?', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestaegresado`
--

CREATE TABLE `respuestaegresado` (
  `id` int(11) NOT NULL,
  `id_test_egresado` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `id_opcion_respuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'Egresado'),
(2, 'Empresa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tiempo_minutos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`, `nombre`, `tiempo_minutos`) VALUES
(2, 'Test de egresado', 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testegresado`
--

CREATE TABLE `testegresado` (
  `id` int(11) NOT NULL,
  `egresado_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `TotalCorrectas` int(11) NOT NULL,
  `precision_test` decimal(4,2) NOT NULL,
  `puntaje` decimal(4,2) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulo`
--

CREATE TABLE `titulo` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `codigo` varchar(450) NOT NULL,
  `categoria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `titulo`
--

INSERT INTO `titulo` (`id`, `nombre`, `codigo`, `categoria`) VALUES
(1, 'Administración de Empresas', '101', 'Pregrado'),
(2, 'Contaduría Pública', '102', 'Pregrado'),
(3, 'Ingeniería Agronómica', '103', 'Pregrado'),
(4, 'Ingeniería Ambiental', '104', 'Pregrado'),
(5, 'Zootecnia', '105', 'Pregrado'),
(6, 'Ciencias del Deporte y la Educación Física', '106', 'Pregrado'),
(7, 'Licenciatura en Ciencias Sociales', '107', 'Pregrado'),
(8, 'Ingeniería de Sistemas', '108', 'Pregrado'),
(9, 'Ingeniería Electrónica', '109', 'Pregrado'),
(10, 'Licenciatura en Educación Básica con Énfasis en Humanidades e Idiomas', '110', 'Pregrado'),
(11, 'Licenciatura en Educación Básica con Énfasis en Matemáticas', '111', 'Pregrado'),
(12, 'Licenciatura en Educación Básica con Énfasis en Ciencias Naturales y Educación Ambiental', '112', 'Pregrado'),
(13, 'Licenciatura en Educación Básica con Énfasis en Educación Artística', '113', 'Pregrado'),
(14, 'Licenciatura en Educación Básica con Énfasis en Educación Física, Recreación y Deportes', '114', 'Pregrado'),
(15, 'Licenciatura en Educación Infantil', '115', 'Pregrado'),
(16, 'Licenciatura en Educación Preescolar', '116', 'Pregrado'),
(17, 'Licenciatura en Educación Especial', '117', 'Pregrado'),
(18, 'Licenciatura en Educación para la Primera Infancia', '118', 'Pregrado'),
(19, 'Licenciatura en Educación para la Inclusión', '119', 'Pregrado'),
(20, 'Licenciatura en Educación para la Diversidad', '120', 'Pregrado'),
(21, 'Maestría en Educación', '201', 'Posgrado'),
(22, 'Maestría en Gestión Ambiental', '202', 'Posgrado'),
(23, 'Especialización en Gerencia de Proyectos', '203', 'Posgrado'),
(24, 'Especialización en Gestión de la Calidad y Auditoría en Salud', '204', 'Posgrado'),
(25, 'Especialización en Gerencia de Servicios de Salud', '205', 'Posgrado'),
(26, 'Especialización en Gestión de la Seguridad y Salud en el Trabajo', '206', 'Posgrado'),
(27, 'Especialización en Gestión de la Tecnología Educativa', '207', 'Posgrado'),
(28, 'Especialización en Gestión de la Innovación', '208', 'Posgrado'),
(29, 'Especialización en Gestión de la Calidad en la Educación Superior', '209', 'Posgrado'),
(30, 'Especialización en Gestión de la Responsabilidad Social Empresarial', '210', 'Posgrado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id` int(11) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `egresado`
--
ALTER TABLE `egresado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_residencia` (`id_residencia`);

--
-- Indices de la tabla `egresado_titulo`
--
ALTER TABLE `egresado_titulo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_egresado` (`id_egresado`),
  ADD KEY `id_titulo` (`id_titulo`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ubicacion_empresa` (`id_ubicacion_empresa`);

--
-- Indices de la tabla `habilidad`
--
ALTER TABLE `habilidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `habilidadpregunta`
--
ALTER TABLE `habilidadpregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `habilidad_id` (`habilidad_id`),
  ADD KEY `pregunta_id` (`pregunta_id`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_oferta` (`id_oferta`),
  ADD KEY `id_egresado` (`id_egresado`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empresa` (`id_empresa`),
  ADD KEY `id_modalidad` (`id_modalidad`),
  ADD KEY `id_ubicacion_oferta` (`id_ubicacion_oferta`);

--
-- Indices de la tabla `opcion`
--
ALTER TABLE `opcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pregunta_id` (`pregunta_id`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_id` (`test_id`);

--
-- Indices de la tabla `respuestaegresado`
--
ALTER TABLE `respuestaegresado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_test_egresado` (`id_test_egresado`),
  ADD KEY `id_pregunta` (`id_pregunta`),
  ADD KEY `id_opcion_respuesta` (`id_opcion_respuesta`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `testegresado`
--
ALTER TABLE `testegresado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `egresado_id` (`egresado_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Indices de la tabla `titulo`
--
ALTER TABLE `titulo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `egresado`
--
ALTER TABLE `egresado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `egresado_titulo`
--
ALTER TABLE `egresado_titulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `habilidad`
--
ALTER TABLE `habilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `habilidadpregunta`
--
ALTER TABLE `habilidadpregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `opcion`
--
ALTER TABLE `opcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `respuestaegresado`
--
ALTER TABLE `respuestaegresado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `testegresado`
--
ALTER TABLE `testegresado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `titulo`
--
ALTER TABLE `titulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `egresado`
--
ALTER TABLE `egresado`
  ADD CONSTRAINT `egresado_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `egresado_ibfk_2` FOREIGN KEY (`id_residencia`) REFERENCES `ubicacion` (`id`);

--
-- Filtros para la tabla `egresado_titulo`
--
ALTER TABLE `egresado_titulo`
  ADD CONSTRAINT `egresado_titulo_ibfk_1` FOREIGN KEY (`id_egresado`) REFERENCES `egresado` (`id`),
  ADD CONSTRAINT `egresado_titulo_ibfk_2` FOREIGN KEY (`id_titulo`) REFERENCES `titulo` (`id`);

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `empresa_ibfk_2` FOREIGN KEY (`id_ubicacion_empresa`) REFERENCES `ubicacion` (`id`);

--
-- Filtros para la tabla `habilidadpregunta`
--
ALTER TABLE `habilidadpregunta`
  ADD CONSTRAINT `habilidadpregunta_ibfk_1` FOREIGN KEY (`habilidad_id`) REFERENCES `habilidad` (`id`),
  ADD CONSTRAINT `habilidadpregunta_ibfk_2` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `inscripcion_ibfk_1` FOREIGN KEY (`id_oferta`) REFERENCES `oferta` (`id`),
  ADD CONSTRAINT `inscripcion_ibfk_2` FOREIGN KEY (`id_egresado`) REFERENCES `egresado` (`id`);

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`),
  ADD CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`id_modalidad`) REFERENCES `modalidad` (`id`),
  ADD CONSTRAINT `oferta_ibfk_3` FOREIGN KEY (`id_ubicacion_oferta`) REFERENCES `ubicacion` (`id`);

--
-- Filtros para la tabla `opcion`
--
ALTER TABLE `opcion`
  ADD CONSTRAINT `opcion_ibfk_1` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`);

--
-- Filtros para la tabla `respuestaegresado`
--
ALTER TABLE `respuestaegresado`
  ADD CONSTRAINT `respuestaegresado_ibfk_1` FOREIGN KEY (`id_test_egresado`) REFERENCES `testegresado` (`id`),
  ADD CONSTRAINT `respuestaegresado_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`),
  ADD CONSTRAINT `respuestaegresado_ibfk_3` FOREIGN KEY (`id_opcion_respuesta`) REFERENCES `opcion` (`id`);

--
-- Filtros para la tabla `testegresado`
--
ALTER TABLE `testegresado`
  ADD CONSTRAINT `testegresado_ibfk_1` FOREIGN KEY (`egresado_id`) REFERENCES `egresado` (`id`),
  ADD CONSTRAINT `testegresado_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
