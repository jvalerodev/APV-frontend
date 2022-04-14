import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 gap-20 mt-12 p-5 items-center">
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;