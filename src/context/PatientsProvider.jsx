import { createContext, useState, useEffect } from 'react';
import axiosClient from '../../config/axios';

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    // Busca los pacientes que se encuentren en la base de datos y los carga
    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) return;

                const config = {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                };

                const { data } = await axiosClient('/patients', config);
                setPatients(data);
            } catch (error) {
                console.log(error);
            }
        };

        getPatients();
    }, []);

    // Guarda el paciente ingresado en la base de datos
    const savePatient = async patient => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        };

        // Actualizar un registro
        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config);
                const updatedPatients = patients.map(patientsState => patientsState.id === data.id ? data : patientsState);
                setPatients(updatedPatients);
            } catch (error) {
                console.log(error);
            }
            return;
        }

        // Crear un paciente nuevo
        try {
            const { data } = await axiosClient.post('/patients', patient, config);
            const { createdAt, updatedAt, ...storedPatient } = data;
            setPatients([storedPatient, ...patients]);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    };

    // Carga los datos del paciente que se desea editar
    const setEdition = patient => {
        setPatient(patient);
    };

    // Elimina un paciente seleccionado
    const deletePatient = async id => {
        const confirmDelete = confirm('¿Desea eliminar este paciente?');

        // Si no desea eliminar el paciente
        if (!confirmDelete) return;

        // Se elimina el paciente
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            };

            const { data } = await axiosClient.delete(`/patients/${id}`, config);
            const patientsUpdated = patients.filter(patientsState => patientsState.id !== id);
            setPatients(patientsUpdated);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PatientsContext.Provider value={{ patients, savePatient, patient, setEdition, deletePatient }}>
            {children}
        </PatientsContext.Provider>
    );
};

export { PatientsProvider };

export default PatientsContext;