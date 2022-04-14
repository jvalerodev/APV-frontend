import usePatients from "../hooks/usePatients";
import Patient from "./Patient";

const PatientList = () => {
    const { patients } = usePatients();

    return (
        <>
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''} <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>

                    {patients.map(patient => (
                        <Patient
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>

                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Pacientes {''} <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </>
    );
};

export default PatientList;