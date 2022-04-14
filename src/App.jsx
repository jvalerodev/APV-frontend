import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import NewPassword from './pages/NewPassword';
import ManagePatients from './pages/ManagePatients';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PatientsProvider>
                    <Routes>
                        {/* Rutas publicas */}
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="confirm-account/:token" element={<ConfirmAccount />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route path="forgot-password/:token" element={<NewPassword />} />
                        </Route>

                        {/* Rutas protegidas */}
                        <Route path="/admin" element={<ProtectedRoute />}>
                            <Route index element={<ManagePatients />} />
                            <Route path="profile" element={<EditProfile />} />
                            <Route path="change-password" element={<ChangePassword />} />
                        </Route>
                    </Routes>
                </PatientsProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;