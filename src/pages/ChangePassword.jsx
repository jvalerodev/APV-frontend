import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const ChangePassword = () => {
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({ currentPassword: '', newPassword: '', repeatNewPassword: '' });

    const { updatePassword } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        // Si hay algun campo vacio
        if (Object.values(password).some(field => field === '')) {
            setAlert({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password.newPassword.length < 6) {
            setAlert({ msg: 'La contraseña debe tener mínimo 6 caracteres', error: true });
            return;
        }

        if (password.newPassword !== password.repeatNewPassword) {
            setAlert({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }

        const result = await updatePassword(password);
        setAlert(result);
    };
    
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar contraseña</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">contraseña aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {alert.msg && <Alert alert={alert} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="currentPassword" className="uppercase font-bold text-gray-600">Contraseña actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="currentPassword"
                                id="currentPassword"
                                placeholder="Escribe tu contraseña actual"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="newPassword" className="uppercase font-bold text-gray-600">Nueva contraseña</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="newPassword"
                                id="newPassword"
                                placeholder="Escribe tu nueva contraseña"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="repeatNewPassword" className="uppercase font-bold text-gray-600">Confirmar nueva contraseña</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="repeatNewPassword"
                                id="repeatNewPassword"
                                placeholder="Confirma tu nueva contraseña"
                                onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar contraseña"
                            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;