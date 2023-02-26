import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const TotalAdmission = () => {

    const [search, setSearch] = useState("");


    const { data: admissions = [], refetch } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-admissions`);
            const data = await res.json();
            return data;
        }
    });



    return (
        <div>
            <h3 className="text-3xl mb-5">Total Admission</h3>

            <input type="text" className="input input-bordered w-full max-w-xs mb-5" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

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
                            </tr>
                        </thead>

                        <tbody>
                            {
                                admissions?.map((admission, i) =>
                                    <tr
                                        key={admission.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{admission.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.employeeName}   : {admission?.data?.length}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.headName}</td>
                                        {
                                            admission?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map((d, i) => <tr>
                                                    <td style={{ border: "1px solid black" }}>{i + 1}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.Name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.Email}</td>
                                                </tr>)
                                        }
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );
};

export default TotalAdmission;