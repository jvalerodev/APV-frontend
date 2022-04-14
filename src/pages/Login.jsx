import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../../config/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlert({ msg: 'Introduce tu email y contraseña', error: true });
            return;
        }

        try {
            const { data } = await axiosClient.post('/veterinarians/login', { email, password });
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesión y Administra tus {""}<span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {alert.msg && <Alert alert={alert} />}

                <form onSubmit={handleSubmit}>
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

                    <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase
                        font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                    <Link to="/register" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Crea una aquí.</Link>
                    <Link to="/forgot-password" className="block text-center my-5 text-gray-500">Olvidé mi contraseña.</Link>
                </nav>
            </div>
        </>
    );
};

export default Login;