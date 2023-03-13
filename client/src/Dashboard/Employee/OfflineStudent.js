import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import EditModal from './EditModal';

const OfflineStudent = () => {
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");
    const [leads, setLeads] = useState([])

    const [editData, setEdidData] = useState(null)
    const [sLead, setSLead] = useState()

    const { data: offlines = [], refetch } = useQuery({
        queryKey: ['offlines'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/offline-admissions/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });

    console.log(offlines);

    const [leadsUpdate, setLeadsUpdate] = useState()

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/user/offline-admissions?employeeName=${sLead.employeeName}&courseName=${sLead.courseName}&batchName=${sLead.batchName}&headName=${sLead.headName}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadsUpdate),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success('Lead Updates Success')
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

    const handleEdidData = (d, online) => {
        setEdidData(d)
        setSLead(online)
    }

    return (
        <div>
            <h3 className="text-2xl mb-3">My Offline Student</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
                <form>
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
                                </tr>
                            </tr>
                        </thead>

                        <tbody className='text-xs'>

                            {
                                offlines?.map((offline) =>
                                    <tr key={offline.Id}>


                                        {
                                            offline?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map((d, i) =>
                                                    <tr>
                                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{offline.date.slice(0, -14)}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{offline.courseName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{offline.batchName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{offline.employeeName}</td>
                                                        <td width="45px" className='min-w-[45px] max-w-[45px]:' style={{ border: "1px solid black" }}>{offline.headName}</td>
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
                                                            <label onClick={() => handleEdidData(d, offline)} htmlFor="editModal" className="btn btn-xs btn-secondary mr-2">Edit</label>
                                                            <p className='btn btn-xs btn-primary my-2' onClick={() => handleAdmission(d, offline)} >Add</p>
                                                            <p className='btn btn-xs btn-denger' onClick={() => handleClose(d, offline)} >Cl</p>
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

export default OfflineStudent;