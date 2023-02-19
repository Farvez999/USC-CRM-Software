import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyClose = () => {

    const { user } = useContext(AuthContext)

    const { data: closes = [], refetch } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/close/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(admissions);

    return (
        <div>
            <h3 className="text-3xl mb-5">My Close Student</h3>


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
                                closes.map((close, i) =>
                                    <tr key={close.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{close.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.employeeName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.headName}</td>

                                        {
                                            close?.data?.map(d =>
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

export default MyClose;