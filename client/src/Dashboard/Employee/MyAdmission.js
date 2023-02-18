import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyAdmission = () => {

    const { user } = useContext(AuthContext)

    const { data: admissions = [], refetch } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/admissions/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    console.log(admissions);
    console.log(admissions.batchName);
    return (
        <div>
            <h3 className="text-3xl mb-5">My Admissions : {admissions?.data?.length}</h3>

            <div className='flex w-full justify-between my-2'>
                <h3 className='font-bold'>Course Name : {admissions.courseName}</h3>
                <h3 className='font-bold'>Batch Name : {admissions.batchName}</h3>
                <h3 className='font-bold'>User Name : {admissions.employeeName}</h3>
                <h3 className='font-bold'>Head Name : {admissions.headName}</h3>
            </div>

            <div className="overflow-x-auto">
                <form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th style={{ border: "1px solid black" }}>Course Name</th>
                                <th style={{ border: "1px solid black" }}>Batch Name</th>
                                <th style={{ border: "1px solid black" }}>User Name</th>
                                <th style={{ border: "1px solid black" }}>Head Name</th>
                                <th style={{ border: "1px solid black" }}>Student Information</th>
                                {/* <th style={{ border: "1px solid black" }}>Phone</th>
                                <th style={{ border: "1px solid black" }}>Email</th> */}
                            </tr>
                        </thead>

                        <tbody>

                            {

                                <tr className='active'
                                    key={admissions.Id}>
                                    <th style={{ border: "1px solid black" }}>{1}</th>
                                    <td style={{ border: "1px solid black" }}>{admissions.courseName}</td>
                                    <td style={{ border: "1px solid black" }}>{admissions.batchName}</td>
                                    <td style={{ border: "1px solid black" }}>{admissions.employeeName}</td>
                                    <td style={{ border: "1px solid black" }}>{admissions.headName}</td>
                                    {
                                        admissions?.data?.map((d, i) => <tr>
                                            {/* <td style={{ border: "1px solid black" }}>{i + 1}</td> */}
                                            <td style={{ border: "1px solid black" }}>{d.Name}</td>
                                            <td style={{ border: "1px solid black" }}>{d.Phone}</td>
                                            <td style={{ border: "1px solid black" }}>{d.Email}</td>
                                        </tr>)
                                    }
                                </tr>
                            }

                            {/* {
                                 admissions?.data?.map((lead, i) =>
                                 <tr className='active'
                                     key={lead.Id}>
                                     
                                     <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                     <td style={{ border: "1px solid black" }}>{lead.Name}</td>
                                     <td style={{ border: "1px solid black" }}>{lead?.Phone}</td>
                                     <td style={{ border: "1px solid black" }}>{lead.Email}</td>
                                 </tr>)
                            } */}

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );
};

export default MyAdmission;