import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Chip, Stack } from "@mui/material";
import { Container, Row, Col } from 'react-bootstrap';
import { MailOutline, Phone, Person, Wc, CalendarToday, School } from "@mui/icons-material";
import styles from './styles.module.css';
import Layout from '../../../layouts/LayoutAuth/Layout';
import CircularProgressComponent from "../../../layouts/CircularProgress/CircularProgress";
import { ObtenerPerfilEgresado } from '../../../../Services/PerfilEgresadoService';
import { useParams } from 'react-router-dom';

// Definición de las interfaces
interface Titulo {
  nombre: string;
  Egresado_Titulo: {
    estado: string;
  };
}

interface PerfilEgresado {
  nombre_completo: string;
  correo: string;
  telefono: string;
  documento: string | null;
  sexo: string;
  fecha_nacimiento: string;
  ano_graduacion: number;
  titulos: Titulo[];
  imagen: any;
  curriculum: string | null;
}

interface ResultadoTest {
  id: number;
  TotalCorrectas: number;
  precision_test: string;
  puntaje: string;
  fecha_fin: string;
}

interface Habilidad {
  habilidad_id: string;
  nombre: string;
  porcentaje: number;
}

interface ResumenTest {
  totalPreguntas: number;
  resultadoTest: ResultadoTest | null;
  habilidades: Habilidad[];
}

interface PerfilEgresadoResponse {
  perfil: PerfilEgresado;
  resumenTest: ResumenTest;
}

const VerPerfilEgresado: React.FC = () => {
  const { id_egresado } = useParams<{ id_egresado: string }>();
  const [perfilEgresado, setPerfilEgresado] = useState<PerfilEgresadoResponse | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await ObtenerPerfilEgresado(Number(id_egresado));
        setPerfilEgresado(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    fetchPerfil();
  }, [id_egresado]);

  if (!perfilEgresado) {
    return <Typography variant="h6">No se pudo cargar el perfil.</Typography>;
  }

  return (
    <Layout>
      <Container fluid className={styles.profilePage}>
        <Row>
          {/* Perfil - Columna Izquierda */}
          <Col xs={12} md={4}>
            <Card className={styles.cardProfile}>
              <CardContent>
                {/* Título del perfil */}
                <Typography variant="h6" gutterBottom component="div" className={styles.cardTitle}>
                  Perfil
                </Typography>

                {/* Imagen del perfil */}
                <div className={`img-fluid ${styles.imageContainer}`}>
                  <img
                    src={perfilEgresado.perfil.imagen || "/assets/photoDefault.png"}
                    alt="Perfil"
                    className={styles.profileImage}
                  />
                </div>

                {/* Nombre completo */}
                <Typography variant="h6" component="div" className={`mb-2 ${styles.profileName}`}>
                  {perfilEgresado.perfil.nombre_completo}
                </Typography>

                {/* Detalles del perfil con íconos */}
                <Typography variant="body2" component="div" className="mb-2">
                  <MailOutline style={{ color: '#003A22' }} /> {perfilEgresado.perfil.correo}
                </Typography>

                <Typography variant="body2" component="div" className="mb-2">
                  <Phone style={{ color: '#003A22' }} /> {perfilEgresado.perfil.telefono}
                </Typography>

                <Typography variant="body2" component="div" className="mb-2">
                  <Person style={{ color: '#003A22' }} /> Documento: {perfilEgresado.perfil.documento}
                </Typography>

                <Typography variant="body2" component="div" className="mb-2">
                  <Wc style={{ color: '#003A22' }} /> Género: {perfilEgresado.perfil.sexo === 'M' ? 'Masculino' : 'Femenino'}
                </Typography>

                <Typography variant="body2" component="div" className="mb-2">
                  <CalendarToday style={{ color: '#003A22' }} /> Fecha de Nacimiento: {perfilEgresado.perfil.fecha_nacimiento}
                </Typography>

                <Typography variant="body2" component="div" className="mb-2">
                  <School style={{ color: '#003A22' }} /> Año de Graduación: {perfilEgresado.perfil.ano_graduacion}
                </Typography>

                {/* Botón de Hoja de Vida o Mensaje */}
                {perfilEgresado.perfil.curriculum ? (
                  <Button variant="contained" className={styles.cvButton}>
                    Hoja de Vida
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary" className="mt-4 text-center">
                    El egresado no ha subido la hoja de vida.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Col>

          {/* Sección Central con Contenedor Blanco */}
          <Col xs={12} md={8}>
            <Card className={styles.cardContainer}>
              <CardContent>
                {/* Títulos */}
                <Row>
                  <Col xs={12}>
                    <Card className={styles.cardTitles}>
                      <CardContent>
                        <Typography variant="h6" component="div" className={styles.cardTitle}>
                          Títulos
                        </Typography>
                        {perfilEgresado.perfil.titulos.length > 0 ? (
                          perfilEgresado.perfil.titulos.map((titulo: Titulo) => (
                            <Stack key={titulo.nombre} direction="row" spacing={2} className={`mb-2 ${styles.stack}`}>
                              <Chip label={titulo.Egresado_Titulo.estado} className={`${styles.titleChip}`} />
                              <Typography variant="body1" component="span">{titulo.nombre}</Typography>
                            </Stack>
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">No tiene títulos registrados.</Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Col>

                  {/* Verificación de si el egresado ha presentado el test */}
                  {perfilEgresado.resumenTest.resultadoTest ? (
                    <>
                      <Col xs={12} md={6}>
                        <div className={styles.whiteCardContainer}>
                          <Card className={styles.cardTechnicalSummary}>
                            <CardContent>
                              <Typography variant="h6" component="div" className={styles.cardTitle}>
                                Resumen de la Prueba Técnica
                              </Typography>
                              <Typography variant="h3" component="div" className={styles.centerText}>
                                {perfilEgresado.resumenTest.resultadoTest.puntaje} / {perfilEgresado.resumenTest.totalPreguntas}
                              </Typography>
                              <Typography variant="body1" component="div" className={styles.centerText}>
                                Precisión: {perfilEgresado.resumenTest.resultadoTest.precision_test}%
                              </Typography>
                              <Typography variant="body1" component="div" className={styles.centerText}>
                                Calificación: {perfilEgresado.resumenTest.resultadoTest.TotalCorrectas}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </Col>

                      <Col xs={12} md={6}>
                        <div className={styles.whiteCardContainer}>
                          <Card className={styles.cardTechnicalSummary}>
                            <CardContent>
                              <Typography variant="h6" component="div" className={styles.cardTitle}>
                                Habilidades
                              </Typography>
                              {perfilEgresado.resumenTest.habilidades.length > 0 ? (
                                <div className={styles.skillsList}>
                                  {perfilEgresado.resumenTest.habilidades.map((habilidad: Habilidad) => (
                                    <Stack key={habilidad.nombre} direction="row" spacing={2} alignItems="center" className="mb-2">
                                      <CircularProgressComponent value={habilidad.porcentaje} />
                                      <Typography variant="body1">{habilidad.nombre}: {habilidad.porcentaje}%</Typography>
                                    </Stack>
                                  ))}
                                </div>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No tiene habilidades registradas.
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </Col>
                    </>
                  ) : (
                    // Mostrar un contenedor con un mensaje si no ha presentado el test
                    <Col xs={12}>
                      <Card className={styles.cardContainerSkills} >
                        <CardContent>
                          <Typography variant="h6" align="center" color="text.secondary">
                            El egresado no ha presentado aún la prueba técnica.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Col>
                  )}
                </Row>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default VerPerfilEgresado;
