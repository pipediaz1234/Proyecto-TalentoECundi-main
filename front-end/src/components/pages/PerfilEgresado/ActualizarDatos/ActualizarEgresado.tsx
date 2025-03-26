import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
  Typography,
  Paper,
} from '@mui/material';
import Layout from '../../../layouts/LayoutAuth/Layout';
import { Row, Col } from 'react-bootstrap';
import { obtenerDepartamentos, obtenerCiudades } from '../../../../Services/DireccionService'; 
import { obtenerPerfil, obtenerTitulos, actualizarPerfilEgresado } from '../../../../Services/PerfilEgresadoService';
import styles from './styles.module.css';

interface Titulo {
  nombre: string;
  estado: string;
}

interface FormData {
  nombres: string;
  apellidos: string;
  documento: string;
  codigo_estudiante: string;
  fecha_nacimiento: string;
  genero: string;
  ano_graduacion: string;
  telefono: string;
  ciudad: string | null;
  departamento: string | null;
  direccion: string | null;
  titulos: Titulo[];
  imagen_perfil: File | null;
  curriculum: File | null;
}

const ActualizarEgresado: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellidos: '',
    documento: '',
    codigo_estudiante: '',
    fecha_nacimiento: '',
    genero: '',
    ano_graduacion: '',
    telefono: '',
    ciudad: null,
    departamento: null,
    direccion: '',
    titulos: [{ nombre: '', estado: '' }],
    imagen_perfil: null,
    curriculum: null,
  });

  const [departamentos, setDepartamentos] = useState<Array<{ id: string; departamento: string }>>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [titulosDisponibles, setTitulosDisponibles] = useState<Array<{ id: string; nombre: string }>>([]);
  const [estadosTitulo, setEstadosTitulo] = useState<Array<{ id: string; nombre: string }>>([
    { id: '1', nombre: 'Graduado' },
    { id: '2', nombre: 'Estudiando' },
  ]);

  // Obtener los datos del usuario desde el localStorage
  const usuarioString = localStorage.getItem('usuario');
  let idEgresado: any = null;

  if (usuarioString) {
    const usuario = JSON.parse(usuarioString);
    idEgresado = usuario.id_relacionado;
    //console.log('ID del egresado:', idEgresado);
  }

  // Cargar departamentos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const deps = await obtenerDepartamentos();
        setDepartamentos(deps);
      } catch (error) {
        console.error('Error al obtener los departamentos:', error);
      }
    };
    cargarDatos();

    obtenerTitulos()
      .then((data) => setTitulosDisponibles(data))
      .catch((error) => console.error('Error al obtener los títulos', error));

    obtenerPerfil(idEgresado)
      .then((data) => setFormData({ ...formData, ...data }))
      .catch((error) => console.error('Error al obtener los datos del perfil', error));
  }, [idEgresado]);

  // Cargar ciudades cuando el departamento cambia
  useEffect(() => {
    if (formData.departamento) {
      const cargarCiudades = async () => {
        try {
          const ciudadesData = await obtenerCiudades(formData.departamento);
          console.log(ciudadesData);
          setCiudades(ciudadesData);
        } catch (error) {
          console.error('Error al obtener ciudades:', error);
        }
      };
      cargarCiudades();
    }
  }, [formData.departamento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const agregarTitulo = () => {
    setFormData({
      ...formData,
      titulos: [...formData.titulos, { nombre: '', estado: '' }],
    });
  };

  const manejarCambioTitulo = (index: number, campo: string, valor: string) => {
    const nuevosTitulos = [...formData.titulos];
    nuevosTitulos[index] = { ...nuevosTitulos[index], [campo]: valor };
    setFormData({ ...formData, titulos: nuevosTitulos });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Crear un objeto con los datos necesarios para enviar al API
      const perfilData = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        documento: formData.documento,
        codigo_estudiante: formData.codigo_estudiante,
        fecha_nacimiento: formData.fecha_nacimiento,
        genero: formData.genero,
        ano_graduacion: formData.ano_graduacion,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        departamento: formData.departamento,
        direccion: formData.direccion,
        imagen_perfil: formData.imagen_perfil,
        curriculum: formData.curriculum,
        titulos: formData.titulos.map((titulo) => ({
          id_titulo: titulosDisponibles.find((t) => t.nombre === titulo.nombre)?.id,
          estado: titulo.estado,
        })),
      };

      // Llamar al servicio para actualizar el perfil
      await actualizarPerfilEgresado(idEgresado, perfilData);

      console.log('Perfil actualizado correctamente');
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Row>
          {/* Columna izquierda para la imagen de perfil */}
          <Col xs={12} md={4}>
            <Paper className={styles.whiteBackgroundContainer}>
              <Box textAlign="center" padding="20px">
                <img
                  src={formData.imagen_perfil ? URL.createObjectURL(formData.imagen_perfil) : 'https://via.placeholder.com/150'}
                  alt="Perfil"
                  className={styles.profileImage}
                />
                <Typography variant="h6" className={styles.profileName}>
                  {formData.nombres} {formData.apellidos}
                </Typography>

                <Button className={styles.uploadButton} variant="contained" component="label" fullWidth>
                  Subir Imagen de Perfil
                  <input type="file" name="imagen_perfil" hidden onChange={handleFileChange} />
                </Button>

                <Typography variant="body2" color="textSecondary" align="center" marginTop="10px">
                  Subir imagen en formato .jpg o .png. Tamaño máximo 1MB.
                </Typography>
              </Box>
            </Paper>
          </Col>

          {/* Columna derecha para el formulario */}
          <Col xs={12} md={8}>
            <Paper className={styles.whiteBackgroundContainer}>
              <Box component="form" onSubmit={handleSubmit} padding="20px">
                <Typography variant="h4" gutterBottom align="center" className={styles.title}>
                  Editar Perfil
                </Typography>

                <TextField
                  label="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Documento"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Código Estudiante"
                  name="codigo_estudiante"
                  value={formData.codigo_estudiante}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Fecha de Nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Género</InputLabel>
                  <Select name="genero" label="Genero" value={formData.genero} onChange={handleChange}>
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                {/* Sección de Ubicación */}
                <Typography variant="h6" className={`${styles.headingSmall} ${styles.textMuted} mb-2 mt-3 `}>
                  Ubicación
                </Typography>

                <Row>
                  <Col xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Departamento</InputLabel>
                      <Select
                        name="departamento"
                        label="Departamento"
                        value={formData.departamento || ''}
                        onChange={(e) => handleChange(e as SelectChangeEvent)}
                      >
                        {departamentos.map((dep) => (
                          <MenuItem key={dep.id} value={dep.departamento}>
                            {dep.departamento}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>

                  <Col xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Ciudad</InputLabel>
                      <Select
                        name="ciudad"
                        label="Ciudad"
                        value={formData.ciudad || ''}
                        onChange={(e) => handleChange(e as SelectChangeEvent)}
                      >
                        {ciudades.map((ciudad) => (
                          <MenuItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                </Row>

                {/* Sección de títulos */}
                <Typography variant="h6" className={`${styles.headingSmall} ${styles.textMuted} mb-2 mt-3`}>
                  Titulos
                </Typography>

                {formData.titulos.map((titulo, index) => (
                  <Row key={index}>
                    <Col xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Nombre del Título</InputLabel>
                        <Select
                          value={titulo.nombre}
                          onChange={(e) => manejarCambioTitulo(index, 'nombre', e.target.value)}
                          label="Nombre del Título"
                        >
                          {titulosDisponibles.map((tituloDisponible) => (
                            <MenuItem key={tituloDisponible.id} value={tituloDisponible.nombre}>
                              {tituloDisponible.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Col>

                    <Col xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Estado</InputLabel>
                        <Select
                          label="Estado"
                          value={titulo.estado}
                          onChange={(e) => manejarCambioTitulo(index, 'estado', e.target.value)}
                        >
                          {estadosTitulo.map((estado) => (
                            <MenuItem key={estado.id} value={estado.nombre}>
                              {estado.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                ))}

                <Button variant="outlined" onClick={agregarTitulo} fullWidth>
                  Agregar otro título
                </Button>

                {/* Sección de Hoja de Vida */}
                <Typography variant="h6" className={`${styles.headingSmall} ${styles.textMuted} mb-2 mt-3`}>
                  Hoja de Vida
                </Typography>

                <Button className={styles.uploadButton} variant="contained" component="label" fullWidth>
                  Subir Curriculum
                  <input type="file" name="curriculum" hidden onChange={handleFileChange} />
                </Button>

                {/* Botón para enviar */}
                <Button className={styles.submitButton} type="submit" variant="contained" fullWidth>
                  Guardar Cambios
                </Button>
              </Box>
            </Paper>
          </Col>
        </Row>
      </Box>
    </Layout>
  );
};

export default ActualizarEgresado;
