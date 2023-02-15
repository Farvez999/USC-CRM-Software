import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import Edit from './Edit';
import { toast } from 'react-hot-toast';

const MyLead = () => {

    const { user } = useContext(AuthContext)
    // console.log(user)

    const [leads, setLeads] = useState([])
    // console.log(leads)


    useEffect(() => {
        fetch(`http://localhost:5000/leads/${user.displayName}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((response) => response.json())
            .then((data) => setLeads(data))
    })


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
    const [leadsStatus, setLeadsStatus] = useState()
    // console.log(updateState);
    // console.log(leadsStatus);


    const handleUpdate = event => {
        event.preventDefault();
        console.log(leadsStatus);
        fetch(`http://localhost:5000/leads/${user.displayName}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadsStatus),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Success:', data);
                toast.success('Lead Updates Success')
                // if (data.modifiedCount > 0) {
                //     alert('Lead Update Success')
                //     console.log(data);
                // }
            });
    }

    const handleAdmission = data => {
        console.log(data);
        console.log(user.displayName);

        const courseName = leads.courseName;
        const batchName = leads.batchName
        const employeeName = leads.employeeName
        const headName = leads.headName
        const admissionData = {
            data: data,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/user-admission-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(admissionData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // if (data.acknowledged) {
                //     console.log(data);
                //     // setIsloader(false)
                toast.success('Admisstion Data added successfully')
                //     // navigate('/dashboard/sellerProducts')
                // }
            })
        // .catch(error => { toast.error(error.message); setIsloader(false) })

    }

    console.log(leads);

    return (
        <div>
            <h3 className="text-3xl mb-5">My Leads : {leads?.data?.length}</h3>

            <div className='flex w-full justify-between my-2'>
                <h3 className='font-bold'>Course Name : {leads.courseName}</h3>
                <h3 className='font-bold'>Batch Name : {leads.batchName}</h3>
                <h3 className='font-bold'>User Name : {leads.employeeName}</h3>
                <h3 className='font-bold'>Head Name : {leads.headName}</h3>
            </div>

            <div className="overflow-x-auto">
                <form onSubmit={handleUpdate}>
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th style={{ border: "1px solid black" }}>Name</th>
                                <th style={{ border: "1px solid black" }}>Phone</th>
                                <th style={{ border: "1px solid black" }}>Email</th>
                                <th style={{ border: "1px solid black" }}>FirstFollowup</th>
                                <th style={{ border: "1px solid black" }}>SecondFollowup</th>
                                <th style={{ border: "1px solid black" }}>ThirdFollowup</th>
                                <th style={{ border: "1px solid black" }}>NextFollowupDate</th>
                                <th style={{ border: "1px solid black" }}>Remark</th>
                                <th style={{ border: "1px solid black" }}>RemarkTwo</th>
                                <th style={{ border: "1px solid black" }}>AdmissionStates</th>
                                <th style={{ border: "1px solid black" }}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                leads?.data?.map((lead, i) =>
                                    updateState === lead.Id ? <Edit
                                        lead={lead}
                                        leads={leads}
                                        setLeads={setLeads}
                                        leadsStatus={leadsStatus}
                                        setLeadsStatus={setLeadsStatus} /> :
                                        <tr className='active'
                                            key={lead.Id}>
                                            <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                            <td style={{ border: "1px solid black" }}>{lead.Name}</td>
                                            <td style={{ border: "1px solid black" }}>{lead?.Phone}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.Email}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.FirstFollowup}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.SecondFollowup}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.ThirdFollowup}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.NextFollowupDate}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.Remark}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.RemarkTwo}</td>
                                            <td style={{ border: "1px solid black" }}>{lead.AdmissionStates}</td>
                                            <td style={{ border: "1px solid black" }}>
                                                <button onClick={() => handleEdit(lead.Id)} className="btn btn-sm btn-primary mr-2">Edit</button>
                                                <p onClick={() => handleAdmission(lead)} >Admission</p>
                                            </td>
                                            <td>

                                            </td>


                                            {/* <td>
            <label onClick={() => handleDelete(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
        </td>  */}
                                        </tr>)
                            }

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );

    // function handleUpdate(e) {
    //     e.preventDefault();
    //     console.log(leads);
    //     // setUpdateState(-1)
    //     // console.log(e.target.value);
    // }

    function handleEdit(id) {
        setUpdateState(id)
    }
};

// function Editt({ lead, leads, setLeads }) {



//     const handleInputChange = event => {
//         const field = event.target.name;
//         const value = event.target.value;
//         console.log("field : ", field, "value : ", value);
//         const newLeads = leads?.data.map(newLead => newLead.Id === leads.Id ? { ...newLead, [field]: [value] } : newLead)
//         console.log(newLeads);
//         leadsStatus(newLeads);
//     }

//     return (
//         <tr>
//             <th>{1}</th>
//             <td>{lead.Name}</td>
//             <td>{lead?.Phone}</td>
//             <td>{lead.Email}</td>
//             <td><input onChange={handleInputChange} className='input input-bordered' type="text" name="FirstFollowup" defaultValue={lead.FirstFollowup}></input></td>
//             <td><input onChange={handleInputChange} className='input input-bordered' type="text" name="SecondFollowup" defaultValue={lead.SecondFollowup}></input></td>
//             <td>{lead.ThirdFollowup}</td>
//             <td>{lead.NextFollowupDate}</td>
//             <td>{lead.Remark}</td>
//             <td>{lead.RemarkTwo}</td>
//             <td>{lead.AdmissionStates}</td>
//             <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button>
//         </tr>
//     )
// }

export default MyLead;