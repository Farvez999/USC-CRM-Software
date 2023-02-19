import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const OfflineStudent = () => {
    const { user } = useContext(AuthContext)

    const { data: offlines = [], refetch } = useQuery({
        queryKey: ['offlines'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/offline-admissions/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(admissions);
    return (
        <div>
        <h3 className="text-3xl mb-5">Offline Interested Student</h3>


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
                            offlines.map((offline, i) =>
                                <tr key={offline.Id}>
                                    <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                    <td style={{ border: "1px solid black" }}>{offline.courseName}</td>
                                    <td style={{ border: "1px solid black" }}>{offline.batchName}</td>
                                    <td style={{ border: "1px solid black" }}>{offline.employeeName}</td>
                                    <td style={{ border: "1px solid black" }}>{offline.headName}</td>

                                    {
                                        offline?.data?.map(d =>
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

export default OfflineStudent;