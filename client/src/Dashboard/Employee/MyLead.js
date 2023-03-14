import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import EditModal from './EditModal';
import { useQuery } from '@tanstack/react-query';

const MyLead = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");

    const [leads, setLeads] = useState([])

    const [editData, setEdidData] = useState(null)
    const [sLead, setSLead] = useState()


    const { data: onlines = [], refetch } = useQuery({
        queryKey: ['onlines'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/leads/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

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


    const [leadsUpdate, setLeadsUpdate] = useState()

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://server-farvez999.vercel.app/leads?employeeName=${sLead.employeeName}&courseName=${sLead.courseName}&batchName=${sLead.batchName}&headName=${sLead.headName}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadsUpdate),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success('Lead Updates Success')
                refetch()
                setEdidData(null)
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
            headName,
            // date: new Date()
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

                if (data.acknowledged) {
                    toast.success('Admisstion Data added successfully')
                }

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
                // console.log(data);
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
                // console.log(data);
                toast.success('Online Seminar Interested')
                let lData = onlines.map(lead => {
                    if (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) {
                        const lds = lead.data.filter(ld => ld.Id !== l.Id)
                        lead.data = lds;
                        return lead;
                    } else {

                        return lead;
                    }
                })

                lData = lData.filter(ld => ld.data.length !== 0);
                refetch()
                setLeads(lData)
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
                // console.log(data);
                toast.success('Offline Admissions Interested')
                let lData = onlines.map(lead => {
                    if (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) {
                        const lds = lead.data.filter(ld => ld.Id !== l.Id)
                        lead.data = lds;
                        return lead;
                    } else {

                        return lead;
                    }
                })

                lData = lData.filter(ld => ld.data.length !== 0);
                refetch()
                setLeads(lData)
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
                // console.log(data);
                toast.success('Seminar Interested Added')
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

    const handleNoRecice = (l, singleLead) => {
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

        fetch(`https://server-farvez999.vercel.app/user-no-recive-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(seminarIntersted)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                toast.success('No Recived Added')
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


    const handleEdidData = (l, singleLead) => {
        setEdidData(l)
        setSLead(singleLead)
    }


    return (
        <div>
            <h3 className="text-2xl mb-3">My Leads</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            {/* <button onClick={handleTodayFollowup} type="">Today</button> */}

            <div >
                <div className="overflow-scroll" style={{ height: '430px', width: "1050px" }}>
                    <form>
                        <table className="table-fixed">
                            <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr className='text-xs'>
                                    {/* <th width="20px" style={{ border: "1px solid black" }}>#</th>
                                    <th width="30px" style={{ border: "1px solid black" }}>B N</th>
                                    <th width="30px" style={{ border: "1px solid black" }}>Date</th> */}
                                    <div>
                                        <th width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>#</th>
                                        <th width="60px" className='min-w-[60px] max-w-[60px]:' style={{ border: "1px solid black" }}>B N</th>
                                        <th width="60px" className='min-w-[60px] max-w-[60px]:' style={{ border: "1px solid black" }}>Date</th>
                                        <th width="80px" className='min-w-[80px] max-w-[80px]: overflow-x-auto' style={{ border: "1px solid black" }}>Name</th>
                                        <th width="120px" className='min-w-[120px] max-w-[120px]: overflow-x-auto' style={{ border: "1px solid black" }}>Phone</th>
                                        <th width="200px" className='min-w-[200px] max-w-[200px]: overflow-x-auto' style={{ border: "1px solid black" }}>Email</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]: overflow-x-auto' style={{ border: "1px solid black" }} >1st F up</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]: overflow-x-auto' style={{ border: "1px solid black" }}>2nd F up</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>3rd F up</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Next F D</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Remark</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Remark 2</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Ad Status</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Action</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Interested</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Seminar</th>
                                    </div>
                                </tr>
                            </thead>

                            <tbody style={{ width: "1200px" }} className='w-fit text-xs'>
                                {
                                    leads?.filter(singleLead => {
                                        return search?.toLowerCase() === '' ? singleLead : singleLead.batchName.toLowerCase().includes(search?.toLowerCase()) || singleLead.date.toLowerCase().includes(search?.toLowerCase())
                                    })
                                        ?.map((singleLead, i) =>
                                            <tr>
                                                {/* <th width="20px" style={{ border: "1px solid black" }}>{i + 1}</th> */}
                                                {/* <th width="30px" style={{ border: "1px solid black" }}>{singleLead.batchName}</th>
                                                <th width="30px" style={{ border: "1px solid black" }}>{singleLead.date.slice(0, -14)}</th> */}
                                                {
                                                    singleLead?.data?.map((l, i) =>

                                                        <div>
                                                            <td width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>{i + 1}</td>
                                                            <td width="60px" className='min-w-[60px] max-w-[60px]:' style={{ border: "1px solid black" }}>{singleLead.batchName}</td>
                                                            <td width="60px" className='min-w-[60px] max-w-[60px]:' style={{ border: "1px solid black" }}>{singleLead.date?.slice(0, -14)}</td>

                                                            <td width="80px" className='min-w-[80px] max-w-[80px]:' style={{ border: "1px solid black" }}>{l.Name}</td>
                                                            <td width="120px" className='min-w-[120px] max-w-[120px]:' style={{ border: "1px solid black" }}>{l.Phone}</td>
                                                            <td width="200px" className='min-w-[200px] max-w-[200px]:' style={{ border: "1px solid black" }}>{l.Email?.slice(0, -9)}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.FirstFollowup}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.SecondFollowup}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.ThirdFollowup}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.NextFollowupDate}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.Remark}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.RemarkTwo}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{l.AdmissionStates}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                                <label onClick={() => handleEdidData(l, singleLead)} htmlFor="editModal" className="btn btn-xs btn-secondary">Edit</label>
                                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(l, singleLead)} >Add</p>
                                                                <p className='btn btn-xs btn-denger' onClick={() => handleClose(l, singleLead)} >Cl</p>
                                                            </td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(l, singleLead)} >On</p>
                                                                <p className='btn btn-xs btn-denger' onClick={() => handleOffline(l, singleLead)} >Off</p>
                                                            </td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleSeminarInterested(l, singleLead)} >Inter</p>
                                                                <p className='text-xs btn btn-xs btn-primary my-2' onClick={() => handleNoRecice(l, singleLead)}>No R</p>
                                                            </td>

                                                        </div>
                                                    )
                                                }
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </form>
                </div>
                {
                    editData &&
                    <EditModal
                        handleUpdate={handleUpdate}
                        editData={editData}
                        singleLead={sLead}
                        leadsUpdate={leadsUpdate}
                        setLeadsUpdate={setLeadsUpdate}
                    >
                    </EditModal>}
            </div>
        </div>
    );


};



export default MyLead;