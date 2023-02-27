import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Edit from './Edit';

const TodayFollowup = () => {

    const { user } = useContext(AuthContext)
    const [todayFollowup, setTodayFollowup] = useState([])
    const [search, setSearch] = useState("");
    const [updateState, setUpdateState] = useState(-1)

    const [leadsStatus, setLeadsStatus] = useState()

    console.log(todayFollowup);

    var date = new Date()
    console.log(date);

    useEffect(() => {
        fetch(`http://localhost:5000/followup/${user.displayName}/${date}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setTodayFollowup(data)
            })
    }, [])



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

                let lData = todayFollowup.map(lead => {
                    if (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) {
                        const lds = lead.data.filter(ld => ld.Id !== l.Id)
                        lead.data = lds;
                        return lead;
                    } else {

                        return lead;
                    }
                })

                lData = lData.filter(ld => ld.data.length !== 0);

                setTodayFollowup(lData)
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
                let lData = todayFollowup.map(lead => {
                    if (lead.batchName === batchName && lead.courseName === courseName && lead.employeeName === employeeName && lead.headName === headName) {
                        const lds = lead.data.filter(ld => ld.Id !== l.Id)
                        lead.data = lds;
                        return lead;
                    } else {

                        return lead;
                    }
                })

                lData = lData.filter(ld => ld.data.length !== 0);

                setTodayFollowup(lData)

            })
    }

    return (
        <div>
            <h3 className="text-3xl mb-3">Today Followup Student</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
                <form onSubmit={handleUpdate}>
                    <table className="table-fixed">
                        <thead>
                            <tr className='text-xs'>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th width="5%" style={{ border: "1px solid black" }}>C N</th>
                                <th width="5%" style={{ border: "1px solid black" }}>B N</th>
                                <th width="5%" style={{ border: "1px solid black" }}>U N</th>
                                <th width="5%" style={{ border: "1px solid black" }}>H N</th>
                                <tr>
                                    <th width="5%" style={{ border: "1px solid black" }}>Name</th>
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
                                </tr>
                            </tr>
                        </thead>

                        <tbody className='text-xs'>

                            {
                                todayFollowup.map((todayFollow, i) =>
                                    <tr key={todayFollow.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.employeeName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.headName}</td>

                                        {
                                            todayFollow?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map(d =>
                                                    updateState === d.Id ? <Edit
                                                        l={d}
                                                        singleLead={todayFollow}
                                                        setLeads={setTodayFollowup}
                                                        leadsStatus={leadsStatus}
                                                        setLeadsStatus={setLeadsStatus} /> :
                                                        <tr>
                                                            <td width="10%" style={{ border: "1px solid black" }}>{d.Name}</td>
                                                            <td width="7%" style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                            <td width="10%" style={{ border: "1px solid black" }}>{d.Email}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.FirstFollowup}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.SecondFollowup}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.ThirdFollowup}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.NextFollowupDate}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.Remark}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.RemarkTwo}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>{d.AdmissionStates}</td>
                                                            <td width="5%" style={{ border: "1px solid black" }}>
                                                                <button onClick={() => handleEdit(d.Id)} className="btn btn-xs btn-secondary mr-2">Edit</button>
                                                                <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(d, todayFollow)} >Admission</p>
                                                                <p className='btn btn-xs btn-denger' onClick={() => handleClose(d, todayFollow)} >Close</p>
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
    );
    function handleEdit(id) {
        setUpdateState(id)
        console.log(id);
    }
};

export default TodayFollowup;