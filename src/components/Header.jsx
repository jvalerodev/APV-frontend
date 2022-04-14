import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { signOut } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center">
                <h1 className="font-bold text-2xl text-indigo-200">
                    Administrador de Pacientes de {''}
                    <span className="text-white font-black">Veterinaria</span>
                </h1>

                <nav className="flex flex-col md:flex-row gap-6 mt-5 lg:mt-0 items-center">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
                    <Link to="/admin/profile" className="text-white text-sm uppercase font-bold">Perfil</Link>
                    <button type="button" className="text-white text-sm uppercase font-bold" onClick={signOut}>Cerrar sesión</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;