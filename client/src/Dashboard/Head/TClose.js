import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const TClose = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");

    const { data: closes = [], refetch } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/head/close/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h3 className="text-2xl mb-3">My Close Student</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
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
                                closes.map((close, i) =>
                                    <tr key={close.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{close.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.employeeName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.headName}</td>

                                        {
                                            close?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map(d =>
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

export default TClose;