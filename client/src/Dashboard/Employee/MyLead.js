import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'

const MyLead = () => {

    const { user } = useContext(AuthContext)
    console.log(user)

    const [leads, setLeads] = useState([])
    // console.log(leads)


    fetch(`http://localhost:5000/leads/${user.displayName}`, {
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then((response) => response.json())
        .then((data) => setLeads(data))


    // const { data: products, isLoading, refetch } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch(`http://localhost:5000/leads/${user.displayName}`, {
    //                 headers: {
    //                     authorization: `bearer ${localStorage.getItem('accessToken')}`
    //                 }
    //             });
    //             const data = await res.json();
    //             return data;
    //         }
    //         catch (error) {

    //         }
    //     }
    // });

    const [updateState, setUpdateState] = useState(-1)

    // const handleEdit = (id) => {

    // }

    return (
        <div>
            <h3 className="text-3xl mb-5">My Leads : {leads?.data?.length}</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>FirstFollowup</th>
                            <th>SecondFollowup</th>
                            <th>ThirdFollowup</th>
                            <th>NextFollowupDate</th>
                            <th>Remark</th>
                            <th>RemarkTwo</th>
                            <th>AdmissionStates</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            leads?.data?.map((lead, i) =>
                                updateState === lead.Id ? <Edit lead={lead} leads={leads} setLeads={setLeads} /> :
                                    <tr
                                        key={lead.Id}>
                                        <th>{i + 1}</th>
                                        <td>{lead.Name}</td>
                                        <td>{lead?.Phone}</td>
                                        <td>{lead.Email}</td>
                                        <td>{lead.FirstFollowup}</td>
                                        <td>{lead.SecondFollowup}</td>
                                        <td>{lead.ThirdFollowup}</td>
                                        <td>{lead.NextFollowupDate}</td>
                                        <td>{lead.Remark}</td>
                                        <td>{lead.RemarkTwo}</td>
                                        <td>{lead.AdmissionStates}</td>
                                        <td>
                                            <button onClick={() => handleEdit(lead.Id)} className="btn btn-sm btn-primary mr-2">Edit</button>
                                            <button className="btn btn-sm btn-secondary">Delete</button>
                                        </td>


                                        {/* <td>
                                <label onClick={() => handleDelete(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                            </td>  */}
                                    </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );

    function handleEdit(id) {
        setUpdateState(id)
    }
};

function Edit({ lead, leads, setLeads }) {
    console.log(lead);
    return (
        <tr>
            <th>{1}</th>
            <td>{lead.Name}</td>
            <td>{lead?.Phone}</td>
            <td>{lead.Email}</td>
            <td><input type="text" name="name" value={lead.FirstFollowup}></input></td>
            <td><input type="text" name="name" value={lead.SecondFollowup}></input></td>
            <td>{lead.ThirdFollowup}</td>
            <td>{lead.NextFollowupDate}</td>
            <td>{lead.Remark}</td>
            <td>{lead.RemarkTwo}</td>
            <td>{lead.AdmissionStates}</td>
            <button type='submit' className="btn btn-sm btn-primary mr-2">Edit</button>
        </tr>
    )
}

export default MyLead;