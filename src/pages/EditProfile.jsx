import { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const EditProfile = () => {
    const { auth, updateProfile } = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleSubmit = async e => {
        e.preventDefault();
        const { name, email } = profile;

        if ([name, email].includes('')) {
            setAlert({ msg: 'Nombre y Email son obligatorios', error: true });
            return;
        }

        const result = await updateProfile(profile);
        setAlert(result);
    };

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">Información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {alert.msg && <Alert alert={alert} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="name" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="name"
                                id="name"
                                value={profile.name || ''}
                                onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"
                                id="web"
                                value={profile.web || ''}
                                onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="phone" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="phone"
                                id="phone"
                                value={profile.phone || ''}
                                onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"
                                id="email"
                                value={profile.email || ''}
                                onChange={e => setProfile({ ...profile, [e.target.name]: e.target.value })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar cambios"
                            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;