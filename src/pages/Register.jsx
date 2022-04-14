import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';
import Alert from '../components/Alert';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password !== repeatPassword) {
            setAlert({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }

        if (password.length < 6) {
            setAlert({ msg: 'La contraseña debe tener mínimo 6 caracteres', error: true });
            return;
        }

        setAlert({});

        // Crear el usuario en la API
        try {
            await axiosClient.post('/veterinarians', { name, email, password });
            setName('');
            setEmail('');
            setPassword('');
            setPassword('');
            setRepeatPassword('');
            setAlert({ msg: 'Usuario creado exitosamente, revisa tu email para confimar tu cuenta', error: false });
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea una cuenta y Administra tus {""}<span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {alert.msg && <Alert alert={alert} />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input type="text"
                            placeholder="Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Repetir contraseña</label>
                        <input
                            type="password"
                            placeholder="Repite tu contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase
                        font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión.</Link>
                    <Link to="/forgot-password" className="block text-center my-5 text-gray-500">Olvidé mi contraseña.</Link>
                </nav>
            </div>
        </>
    );
};

export default Register;