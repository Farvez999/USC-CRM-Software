import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Edit from './Edit';
import EditModal from './EditModal';

const SeminarInterested = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState([])

    const [editData, setEdidData] = useState(null)
    const [sLead, setSLead] = useState()

    const { data: seminarInteresteds = [], refetch } = useQuery({
        queryKey: ['seminarInteresteds'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/seminar-interested/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        fetch(`https://server-farvez999.vercel.app/user/seminar-interested/${user.displayName}`, {
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
    console.log(leadsUpdate);

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://server-farvez999.vercel.app/user/seminar-interested?employeeName=${sLead.employeeName}&courseName=${sLead.courseName}&batchName=${sLead.batchName}&headName=${sLead.headName}`, {
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
            headName
        }

        fetch(`https://server-farvez999.vercel.app/seminar-interest-add`, {
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

                let lData = seminarInteresteds.map(lead => {
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

        fetch(`https://server-farvez999.vercel.app/seminar-interest-close-data`, {
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
                let lData = seminarInteresteds.map(lead => {
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

    const handleattend = ((l, singleLead) => {
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

        fetch(`https://server-farvez999.vercel.app/seminar-attend-add`, {
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
                toast.success('Seminar Attend Submission')
                let lData = seminarInteresteds.map(lead => {
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
    })

    const handleOnline = (l, seminarInterested) => {
        const courseName = seminarInterested.courseName
        const batchName = seminarInterested.batchName
        const employeeName = seminarInterested.employeeName
        const headName = seminarInterested.headName
        const onlineAdmisssionIntersted = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`https://server-farvez999.vercel.app/seminar-online-admission-data`, {
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
                let lData = seminarInteresteds.map(lead => {
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

    const handleOffline = (l, seminarInterested) => {
        const courseName = seminarInterested.courseName
        const batchName = seminarInterested.batchName
        const employeeName = seminarInterested.employeeName
        const headName = seminarInterested.headName
        const offlineAdmisssionIntersted = {
            data: l,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`https://server-farvez999.vercel.app/seminar-offline-admission-data`, {
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
                let lData = seminarInteresteds.map(lead => {
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

    const handleEdidData = (d, online) => {
        setEdidData(d)
        setSLead(online)
    }

    return (
        <div>
            <h3 className="text-2xl mb-3">Seminar Interested Student</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
                <form onSubmit={handleUpdate}>
                    <table className="table-fixed">
                        <thead className='sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                            <tr className='text-xs'>

                                <tr>
                                    <th style={{ border: "1px solid black" }}>#</th>
                                    <th width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>Date</th>
                                    <th width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>C N</th>
                                    <th width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>B N</th>
                                    <th width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>U N</th>
                                    <th width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>H N</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Name</th>
                                    <th width="120px" className='min-w-[120px] max-w-[120px]:' style={{ border: "1px solid black" }}>Phone</th>
                                    <th width="200px" className='min-w-[200px] max-w-[200px]:' style={{ border: "1px solid black" }}>Email</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>1st F up</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>2nd F up</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>3rd F up</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Next F D</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Remark</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Remark 2</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Ad S</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Action</th>
                                    <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Interested</th>
                                </tr>
                            </tr>
                        </thead>

                        <tbody className='text-xs'>

                            {
                                seminarInteresteds?.map((seminarInterested) =>

                                    <tr key={seminarInterested.Id}>


                                        {
                                            seminarInterested?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map((d, i) =>
                                                    <div>
                                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{seminarInterested.date.slice(0, -14)}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{seminarInterested.courseName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{seminarInterested.batchName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{seminarInterested.employeeName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{seminarInterested.headName}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.Name}</td>
                                                        <td width="120px" className='min-w-[120px] max-w-[120px]:' style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                        <td width="200px" className='min-w-[200px] max-w-[200px]:' style={{ border: "1px solid black" }}>{d.Email?.slice(0, -9)}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.FirstFollowup}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.SecondFollowup}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.ThirdFollowup}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.NextFollowupDate}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.Remark}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.RemarkTwo}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>{d.AdmissionStates}</td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                            <label onClick={() => handleEdidData(d, seminarInterested)} htmlFor="editModal" className="btn btn-xs btn-secondary mt-2">Edit</label>
                                                            <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(d, seminarInterested)} >Add</p>
                                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(d, seminarInterested)} >Cl</p>
                                                            <br></br>

                                                        </td>
                                                        <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                            <p className='btn btn-xs btn-primary my-2' onClick={() => handleOnline(d, seminarInterested)} >On</p>
                                                            <p className='btn btn-xs btn-denger' onClick={() => handleOffline(d, seminarInterested)} >Off</p>
                                                            <p className='btn btn-xs btn-denger mt-2 mb-2' onClick={() => handleattend(d, seminarInterested)} > SA </p>
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
    );
};

export default SeminarInterested;