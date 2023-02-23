import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import Edit from './Edit';
import { toast } from 'react-hot-toast';

const MyLead = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");

    const [leads, setLeads] = useState([])
    const [admission, setAdmission] = useState([])
    const [signleLeads, setSignleLeads] = useState([])
    const [batchName, setBatchData] = useState([])

    // console.log(leads);
    // console.log(admission);

    useEffect(() => {
        fetch(`http://localhost:5000/leads/${user.displayName}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setLeads(data)
            })
    }, [])

    const [updateState, setUpdateState] = useState(-1)

    const [leadsStatus, setLeadsStatus] = useState()


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
                toast.success('Lead Updates Success')
            });
    }



    const handleAdmission = (l, singleLead) => {

        const courseName = singleLead.courseName;
        const batchName = singleLead.batchName
        const employeeName = singleLead.employeeName
        const headName = singleLead.headName
        const admissionData = {
            data: l,
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
                toast.success('Admisstion Data added successfully')


            })

    }



    const handleClose = (l, singleLead) => {
        const courseName = singleLead.courseName
        const batchName = singleLead.batchName
        const employeeName = singleLead.employeeName
        const headName = singleLead.headName
        const closeData = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/user-close-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(closeData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Admisstion Data Close successfully')
                // eslint-disable-next-line array-callback-return
                let lData = leads.map(lead => {
                    if (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) {
                        const lds = lead.data.filter(ld => ld.Id !== l.Id)
                        lead.data = lds;
                        return lead;
                    } else {

                        return lead;
                    }
                })

                lData = lData.filter(ld => ld.data.length !== 0);
                //const lData = leads.map(lead => (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) ? lead.data = lead.data.filter(da => da.Id !== l.Id) : lead)
                setLeads(lData)
                // if (data.acknowledged) {
                //     fetch(`http://localhost:5000/user-close-delete/${l.Id}`, {
                //         method: 'DELETE',
                //         headers: {
                //             authorization: `bearer ${localStorage.getItem('accessToken')}`
                //         }
                //     })
                //         .then(res => res.json())
                //         .then(data => {
                //             if (data.deletedCount > 0) {
                //                 // refetch();
                //                 toast.success(`Doctor ${l.Name} deleted successfully`)
                //             }
                //         })
                // }
            })
    }

    const handleOnline = (l, singleLead) => {
        const courseName = singleLead.courseName
        const batchName = singleLead.batchName
        const employeeName = singleLead.employeeName
        const headName = singleLead.headName
        const onlineAdmisssionIntersted = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/user-online-admission-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(onlineAdmisssionIntersted)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Online Admissions Interested')
            })
    }

    const handleOffline = (l, singleLead) => {
        const courseName = singleLead.courseName
        const batchName = singleLead.batchName
        const employeeName = singleLead.employeeName
        const headName = singleLead.headName
        const offlineAdmisssionIntersted = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/user-offline-admission-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(offlineAdmisssionIntersted)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Offline Admissions Interested')
            })
    }

    const handleSeminarInterested = (l, singleLead) => {
        const courseName = singleLead.courseName
        const batchName = singleLead.batchName
        const employeeName = singleLead.employeeName
        const headName = singleLead.headName
        const seminarIntersted = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/user-seminar-interested-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(seminarIntersted)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Seminar Interested Added')
            })
    }



    return (
        <div>
            <h3 className="text-3xl mb-5">My Leads : {leads?.length}</h3>

            <input type="text" className="input input-bordered w-full max-w-xs mb-5" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className='w-100' >
                <div className="overflow-scroll" style={{ height: '300px' }}>
                    <form onSubmit={handleUpdate}>
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid black" }}>#</th>
                                    <th style={{ border: "1px solid black" }}>Batch Name</th>
                                    <tr>
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
                                        <th style={{ border: "1px solid black" }}>Interested</th>
                                        <th style={{ border: "1px solid black" }}>Seminar</th>
                                    </tr>
                                </tr>
                            </thead>

                            <tbody className='w-fit'>
                                {
                                    leads?.map((singleLead, i) =>
                                        <tr>
                                            <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                            <th style={{ border: "1px solid black" }}>{singleLead.batchName}</th>
                                            {
                                                singleLead?.data?.filter((l) => {
                                                    return search?.toLowerCase() === '' ? l : l.Name.toLowerCase().includes(search?.toLowerCase()) || l.Phone.toLowerCase().includes(search?.toLowerCase()) || l.Email.toLowerCase().includes(search?.toLowerCase());
                                                })
                                                    ?.map((l, i) =>
                                                        updateState === l.Id ? <Edit
                                                            l={l}
                                                            singleLead={singleLead}
                                                            setLeads={setLeads}
                                                            leadsStatus={leadsStatus}
                                                            setLeadsStatus={setLeadsStatus} /> :
                                                            <tr>
                                                                {/* <td style={{ border: "1px solid black" }}>{l.Id}</td> */}
                                                                <td style={{ border: "1px solid black" }}>{l.Name}</td>
                                                                <td className='w-20' style={{ border: "1px solid black" }}>{l.Phone}</td>
                                                                <td className='w-20' style={{ border: "1px solid black" }}>{l.Email}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.FirstFollowup}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.SecondFollowup}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.ThirdFollowup}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.NextFollowupDate}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.Remark}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.RemarkTwo}</td>
                                                                <td style={{ border: "1px solid black" }}>{l.AdmissionStates}</td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    {/* <p onClick={() => handleEdit(l.Id)} >Edit</p> */}
                                                                    <button onClick={() => handleEdit(l.Id)} className="btn btn-sm btn-secondary mr-2">Edit</button>
                                                                    <p className='btn btn-sm btn-primary my-2' onClick={() => handleAdmission(l, singleLead)} >Admission</p>
                                                                    <p className='btn btn-sm btn-denger' onClick={() => handleClose(l, singleLead)} >Close</p>
                                                                </td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    <p className='btn btn-sm btn-primary my-2' onClick={() => handleOnline(l, singleLead)} >Online</p>
                                                                    <p className='btn btn-sm btn-denger' onClick={() => handleOffline(l, singleLead)} >Offline</p>
                                                                </td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    <p className='btn btn-sm btn-primary my-2' onClick={() => handleSeminarInterested(l, singleLead)} >Interested</p>
                                                                </td>
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

        </div>
    );


    function handleEdit(id) {
        setUpdateState(id)
        console.log(id);
    }
};


export default MyLead;