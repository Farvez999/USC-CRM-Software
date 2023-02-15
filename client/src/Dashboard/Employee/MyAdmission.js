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
    return (
        <div>
            <h3 className="text-3xl mb-5">My Admissions : {admissions?.data?.length}</h3>

            <div className="overflow-x-auto">
                <form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th style={{ border: "1px solid black" }}>Name</th>
                                <th style={{ border: "1px solid black" }}>Phone</th>
                                <th style={{ border: "1px solid black" }}>Email</th>
                                {/* <th style={{ border: "1px solid black" }}>FirstFollowup</th>
                                <th style={{ border: "1px solid black" }}>SecondFollowup</th>
                                <th style={{ border: "1px solid black" }}>ThirdFollowup</th>
                                <th style={{ border: "1px solid black" }}>NextFollowupDate</th>
                                <th style={{ border: "1px solid black" }}>Remark</th>
                                <th style={{ border: "1px solid black" }}>RemarkTwo</th>
                                <th style={{ border: "1px solid black" }}>AdmissionStates</th> */}
                                {/* <th style={{ border: "1px solid black" }}>Action</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                admissions?.data?.map((lead, i) =>
                                    <tr className='active'
                                        key={lead.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{lead.Name}</td>
                                        <td style={{ border: "1px solid black" }}>{lead?.Phone}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.Email}</td>
                                        {/* <td style={{ border: "1px solid black" }}>{lead.FirstFollowup}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.SecondFollowup}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.ThirdFollowup}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.NextFollowupDate}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.Remark}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.RemarkTwo}</td>
                                        <td style={{ border: "1px solid black" }}>{lead.AdmissionStates}</td> */}
                                        {/* <td style={{ border: "1px solid black" }}>
                                            <button className="btn btn-sm btn-primary mr-2">Edit</button>
                                            <p  >Admission</p>
                                        </td> */}


                                    </tr>)
                            }

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );
};

export default MyAdmission;