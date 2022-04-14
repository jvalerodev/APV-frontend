import { useContext } from 'react';
import PatientsContext from '../context/PatientsProvider';

const usePatients = () => {
    return useContext(PatientsContext);
};

export default usePatients;