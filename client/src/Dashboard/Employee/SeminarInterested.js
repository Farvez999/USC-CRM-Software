import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const SeminarInterested = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");

    const { data: onlines = [], refetch } = useQuery({
        queryKey: ['onlines'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/seminar-interested/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h3 className="text-3xl mb-5">Seminar Interested Student</h3>

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
                                onlines.filter((online) => {
                                    return search?.toLowerCase() === '' ? online : online.batchName.toLowerCase().includes(search);
                                })
                                    ?.map((online, i) =>
                                        <tr key={online.Id}>
                                            <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                            <td style={{ border: "1px solid black" }}>{online.courseName}</td>
                                            <td style={{ border: "1px solid black" }}>{online.batchName}</td>
                                            <td style={{ border: "1px solid black" }}>{online.employeeName}</td>
                                            <td style={{ border: "1px solid black" }}>{online.headName}</td>

                                            {
                                                online?.data?.map(d =>
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>{d.Name}</td>
                                                        <td style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                        <td style={{ border: "1px solid black" }}>{d.Email}</td>
                                                    </tr>
                                                )
                                            }
                                        </tr>

                                    )
                            }

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );
};

export default SeminarInterested;