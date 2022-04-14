import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../../config/axios';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);

    const { token } = useParams();

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axiosClient(`/veterinarians/forgot-password/${token}`);
                setValidToken(true);
                setPassword('');
                setRepeatPassword('');
                setAlert({ msg: 'Ingresa tu nueva contraseña', error: false });
            } catch (error) {
                console.log(error.response.msg);
                setAlert({ msg: 'Ocurrió un error con el enlace', error: true });
            }
        };

        validateToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setAlert({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }

        if (password.length < 6) {
            setAlert({ msg: 'La contraseña debe tener mínimo 6 caracteres', error: true });
            return;
        }

        try {
            const url = `veterinarians/forgot-password/${token}`;
            const { data } = await axiosClient.post(url, { password });
            setUpdatedPassword(true);
            setAlert({ msg: data.msg, error: false });
        } catch (error) {
            setAlert({ msg: error.response.data.msg, error: true });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Nueva Contraseña y Recupera el Acceso a tus {""}<span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {alert.msg && <Alert alert={alert} />}

                {validToken &&
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">Nueva contraseña</label>
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir contraseña</label>
                            <input
                                type="password"
                                placeholder="Repite tu nueva contraseña"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Crear nueva contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase
                            font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                    </form>
                }

                {updatedPassword &&
                    <Link to="/" className="block text-center my-5 text-gray-500">Iniciar sesión</Link>
                }
            </div>
        </>
    );
};

export default NewPassword;