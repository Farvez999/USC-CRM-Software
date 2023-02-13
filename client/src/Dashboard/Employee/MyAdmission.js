import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyAdmission = () => {

    const { user } = useContext(AuthContext)

    // const { data: buyers = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/user/admissions/${user.displayName}`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });
    return (
        <div>
            <h1>My Admission</h1>
        </div>
    );
};

export default MyAdmission;