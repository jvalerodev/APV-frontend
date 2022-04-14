import { useState, useEffect, createContext } from 'react';
import axiosClient from '../../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {   // Si no hay token es porque el usuario no ha iniciado sesion
                setLoading(false);
                return;
            };

            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            };

            // Se verifica que el usuario tenga un token valido
            try {
                const { data } = await axiosClient('/veterinarians/profile', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setLoading(false);
        };

        authenticateUser();
    }, []);

    const signOut = () => {
        localStorage.removeItem('token');
        setAuth({});
    };

    const updateProfile = async dataUser => {
        const token = localStorage.getItem('token');

        if (!token) {   // Si no hay token es porque el usuario no ha iniciado sesion
            setLoading(false);
            return;
        };

        const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        };

        // Se actualiza la informacion del usuario
        try {
            const { data } = await axiosClient.put(`/veterinarians/profile/${dataUser.id}`, dataUser, config);
            return { msg: 'Datos actualizados correctamente' };
        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    };

    const updatePassword = async dataUser => {
        const token = localStorage.getItem('token');

        if (!token) {   // Si no hay token es porque el usuario no ha iniciado sesion
            setLoading(false);
            return;
        };

        const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        };

        // Se actualiza la contraseña del usuario
        try {
            const { data } = await axiosClient.put('/veterinarians/update-password', dataUser, config);
            return { msg: data.msg };
        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, signOut, updateProfile, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;