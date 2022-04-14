import { useState, useEffect } from 'react';
import Alert from './Alert';
import usePatients from '../hooks/usePatients';

const Form = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const { savePatient, patient } = usePatients();

    useEffect(() => {
        if (patient?.name) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setDate(patient.date);
            setSymptoms(patient.symptoms);
            setId(patient.id);
        }
    }, [patient]);


    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if ([name, owner, email, date, symptoms].includes('')) {
            setAlert({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        savePatient({ name, owner, email, date, symptoms, id });
        setAlert({ msg: 'Guardado correctamente' });
        setName('');
        setOwner('');
        setEmail('');
        setDate('');
        setSymptoms('');
        setId(null);
    };

    return (
        <>
            {alert.msg && <Alert alert={alert} />}

            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus Pacientes y {''} <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-5 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
                <div className="mb-5">
                    <label htmlFor="name" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-600"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="owner" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input
                        type="text"
                        id="owner"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-600"
                        value={owner}
                        onChange={e => setOwner(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-600"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-gray-700 uppercase font-bold">Fecha de Alta</label>
                    <input
                        type="date"
                        id="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-600"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-gray-700 uppercase font-bold">Síntomas</label>
                    <textarea
                        id="symptoms"
                        placeholder="Describe los síntomas de la mascota..."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-600"
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}>
                    </textarea>
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors"
                    value={id ? 'Guardar cambios' : 'Agregar Paciente'}
                />
            </form>
        </>
    );
};

export default Form;