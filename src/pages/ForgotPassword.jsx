import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../../config/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if (email === '') {
            setAlert({ msg: 'El email es obligatorio', error: true });
            return;
        }

        try {
            const { data } = await axiosClient.post('/veterinarians/forgot-password', { email });
            setEmail('');
            setAlert({ msg: data.msg, error: false });
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true });
        }
    };


    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera el Acceso y no Pierdas tus {""}<span className="text-black">Pacientes</span>
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

                    <input type="submit" value="Cambiar contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase
                        font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                    <Link to="/register" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Crea una aquí.</Link>
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión.</Link>
                </nav>
            </div>
        </>
    );
};

export default ForgotPassword;