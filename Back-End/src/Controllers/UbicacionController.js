import Departamentos from '../Config/data.js';

export const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = Departamentos.map(dep => ({
            id: dep.id,
            departamento: dep.departamento
        }));
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los departamentos.' });
    }
};

export const obtenerCiudadesPorDepartamento = async (req, res) => {
    const { nombreDepartamento } = req.params;
    try {
        const departamento = Departamentos.find(dep => dep.departamento === nombreDepartamento);

        if (!departamento) {
            return res.status(404).json({ error: 'Departamento no encontrado.' });
        }

        res.json(departamento.ciudades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ciudades.' });
    }
};
