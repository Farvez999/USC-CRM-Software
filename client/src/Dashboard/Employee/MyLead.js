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
    const [myLeads, setMyLeads] = useState([])


    useEffect(() => {
        fetch(`https://server-farvez999.vercel.app/leads/${user.displayName}`, {
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
        fetch(`https://server-farvez999.vercel.app/leads/${user.displayName}`, {
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

        fetch(`https://server-farvez999.vercel.app/user-admission-add`, {
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

                setLeads(lData)
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

        fetch(`https://server-farvez999.vercel.app/user-close-add`, {
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

                setLeads(lData)

            })
    }

    // function formatedDate(date) {
    //     const newDate = new Date(date);
    //     return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
    // }

    // const handleTodayFollowup = () => {
    //     let lData = leads.map(lead => {

    //         const lds = lead.data.filter(ld => formatedDate(ld.FirstFollowup) === formatedDate(Date.now()))
    //         // console.log(new Date(lead.data[0].FirstFollowup));

    //         console.log(lds);
    //         return lead;

    //     })

    //     lData = lData.filter(ld => ld.data.length !== 0);

    //     setLeads(lData)
    // }

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

        fetch(`https://server-farvez999.vercel.app/user-online-admission-add`, {
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

        fetch(`https://server-farvez999.vercel.app/user-offline-admission-add`, {
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

        fetch(`https://server-farvez999.vercel.app/user-seminar-interested-add`, {
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
            <h3 className="text-2xl mb-3">My Leads</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Batch Name'></input>

            {/* <button onClick={handleTodayFollowup} type="">Today</button> */}

            <div >
                <div className="overflow-scroll" style={{ height: '430px', width: "1050px" }}>
                    <form onSubmit={handleUpdate}>
                        <table className="table-fixed">
                            <thead className='sticky top-0' style={{ width: "1050px" }}>
                                <tr className='text-xs'>
                                    <th style={{ border: "1px solid black" }}>#</th>
                                    <th style={{ border: "1px solid black" }}>B Name</th>
                                    <tr>
                                        <th width="4%" style={{ border: "1px solid black" }}>Name</th>
                                        <th width="7%" style={{ border: "1px solid black" }}>Phone</th>
                                        <th width="10%" style={{ border: "1px solid black" }}>Email</th>
                                        <th width="4%" style={{ border: "1px solid black" }}>1st F up</th>
                                        <th width="4%" style={{ border: "1px solid black" }}>2nd F up</th>
                                        <th width="4%" style={{ border: "1px solid black" }}>3rd F up</th>
                                        <th width="4%" style={{ border: "1px solid black" }}>Next F D</th>
                                        <th width="4%" style={{ border: "1px solid black" }}>Remark</th>
                                        <th width="3%" style={{ border: "1px solid black" }}>Remark 2</th>
                                        <th width="6%" style={{ border: "1px solid black" }}>Ad S</th>
                                        <th width="6%" style={{ border: "1px solid black" }}>Action</th>
                                        <th width="6%" style={{ border: "1px solid black" }}>Interested</th>
                                        <th width="6%" style={{ border: "1px solid black" }}>Seminar</th>
                                    </tr>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    leads?.filter((singleLead) => {
                                        return search?.toLowerCase() === '' ? singleLead : singleLead.batchName.toLowerCase().includes(search?.toLowerCase())
                                    })
                                        ?.map((singleLead, i) =>
                                            <tr>
                                                <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                                <th style={{ border: "1px solid black" }}>{singleLead.batchName}</th>
                                                {
                                                    singleLead?.data?.map((l, i) =>
                                                        updateState === l.Id ? <Edit
                                                            l={l}
                                                            singleLead={singleLead}
                                                            setLeads={setLeads}
                                                            leadsStatus={leadsStatus}
                                                            setLeadsStatus={setLeadsStatus} /> :
                                                            <tr>
                                                                {/* <td style={{ border: "1px solid black" }}>{l.Id}</td> */}
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.Name}</td>
                                                                <td width="5%" className='w-20' style={{ border: "1px solid black" }}>{l.Phone}</td>
                                                                <td width="5%" className='w-20' style={{ border: "1px solid black" }}>{l.Email}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.FirstFollowup}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.SecondFollowup}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.ThirdFollowup}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.NextFollowupDate}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.Remark}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.RemarkTwo}</td>
                                                                <td width="5%" style={{ border: "1px solid black" }}>{l.AdmissionStates}</td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    <button onClick={() => handleEdit(l.Id)} className="btn btn-xs btn-secondary mr-2">Edit</button>
                                                                    <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(l, singleLead)} >Admission</p>
                                                                    <p className='btn btn-xs btn-denger' onClick={() => handleClose(l, singleLead)} >Close</p>
                                                                </td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(l, singleLead)} >Online</p>
                                                                    <p className='btn btn-xs btn-denger' onClick={() => handleOffline(l, singleLead)} >Offline</p>
                                                                </td>
                                                                <td style={{ border: "1px solid black" }}>
                                                                    <p className='btn btn-xs btn-primary my-2' onClick={() => handleSeminarInterested(l, singleLead)} >Interested</p>
                                                                    {/* <p onClick={() => handleTodayFollowup(l, singleLead)} type="">Today</p> */}
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