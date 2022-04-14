import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Alert from '../components/Alert';
import axiosClient from '../../config/axios';

const ConfirmAccount = () => {
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    const { token } = useParams();

    // Se ejecuta una vez se termine de cargar el documento
    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await axiosClient(`/veterinarians/confirm/${token}`);
                setConfirmedAccount(true);
                setAlert({ msg: data.msg, error: false })
            } catch (error) {
                setAlert({ msg: error.response.data.msg, error: true });
            }

            setLoading(false);
        };

        confirmAccount();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu cuenta y Empieza a Administrar tus {""}<span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <Alert alert={alert} />}

                {confirmedAccount && <Link to="/" className="block text-center my-5 text-gray-500">Iniciar sesión.</Link>}
            </div>
        </>
    );
};

export default ConfirmAccount;