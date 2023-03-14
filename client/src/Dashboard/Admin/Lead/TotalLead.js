import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const TotalLead = () => {

    const [admissions, setAmissions] = useState()
    const [search, setSearch] = useState("");
    const [courseSearch, setCourseSearch] = useState("");
    const [batchSearch, setBatchSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [headSearch, setHeadSearch] = useState("");

    const courseRef = useRef();
    const batchRef = useRef();
    const userRef = useRef();
    const headRef = useRef();

    console.log(admissions);
    // console.log(courseSearch);
    // console.log(batchSearch);



    useEffect(() => {
        fetch(`https://server-farvez999.vercel.app/user/total-leads?courseSearch=${courseSearch}&batchSearch=${batchSearch}&userSearch=${userSearch}&headSearch=${headSearch}`)
            .then((res) => res.json())
            .then((data) => setAmissions(data));
    }, [courseSearch, batchSearch, userSearch, headSearch]);


    const handleDelete = (d, admission) => {
        console.log(d.Id);
        console.log(admission);

        fetch(`https://server-farvez999.vercel.app/admin/total-lead/${d.Id}?courseName=${admission.courseName}&batchName=${admission.batchName}&employeeName=${admission.employeeName}&headName=${admission.headName}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                const newData = admission.data.filter(data => data.Id !== d.Id)
                console.log(newData);
                setAmissions(newData)
                toast.success(`Leads ${d.Name} deleted successfully`)
            })
    }

    const { data: coursesName = [] } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/course-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    const { data: batchsName = [] } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/batch-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    const { data: usersName = [] } = useQuery({
        queryKey: ['usersName'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    const { data: headsName = [] } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/head-name-setting`);
            const data = await res.json();
            return data;
        }
    });


    const handleSearch = () => {
        setCourseSearch(courseRef.current.value);
        setBatchSearch(batchRef.current.value);
        setUserSearch(userRef.current.value);
        setHeadSearch(headRef.current.value);
    };



    return (
        <div>
            <h3 className="text-2xl mb-3">Total Leads</h3>

            <div className='flex flex-wrap items-center my-2'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Course Name</span>
                    </label>
                    <select
                        ref={courseRef}
                        className="select select-sm w-full border-gray-400"
                    >
                        <option >Select Course Name</option>
                        {
                            coursesName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.courseName}>
                                    {user.courseName}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Batch Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={batchRef}>
                        <option>Select Batch Name</option>
                        {
                            batchsName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.batchName}>
                                    {user.batchName}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Employee Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={userRef}>
                        <option>Select Employee Name</option>
                        {
                            usersName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.userName}>
                                    {user.userName}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-control mx-2">
                    <label className="label">
                        <span className="label-text">Head Name</span>
                    </label>
                    <select className="select select-sm w-full border-gray-400" required
                        ref={headRef}>
                        <option >Select Head Name</option>
                        {
                            headsName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.headName}>
                                    {user.headName}
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className='mt-8'>
                    <button
                        onClick={handleSearch}
                        className="btn btn-sm btn-primary text-white bg-green-500"
                    >
                        Filter
                    </button>
                </div>

                <div className='mt-8 ml-44'>
                    <input type="text" className="input input-bordered input-sm w-full max-w-md" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Student Name, Phone, Email'></input>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto" style={{ height: '430px', width: "1050px" }}>
                    <form>
                        <table className="table-fixed">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>

                                    <div>
                                        <th width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>#</th>
                                        <th width="85px" className='min-w-[85px] max-w-[85px]:' style={{ border: "1px solid black" }}>Date</th>
                                        <th width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>Course Name</th>
                                        <th width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>Batch Name</th>
                                        <th width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>User Name</th>
                                        <th width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>Head Name</th>
                                        <th width="130px" className='min-w-[130px] max-w-[130px]:' style={{ border: "1px solid black" }}>Name</th>
                                        <th width="150px" className='min-w-[150px] max-w-[150px]:' style={{ border: "1px solid black" }}>Phone</th>
                                        <th width="220px" className='min-w-[220px] max-w-[220px]:' style={{ border: "1px solid black" }}>Email</th>
                                        <th width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>Action</th>
                                    </div>
                                </tr>
                            </thead>

                            <tbody className='w-fit text-xs'>
                                {
                                    admissions?.map((admission) =>
                                        <tr
                                            key={admission.Id}>

                                            {
                                                admission?.data?.filter((d) => {
                                                    return search?.toLowerCase() === d ? d : d?.Name?.toLowerCase().includes(search?.toLowerCase()) || d?.Phone?.toLowerCase().includes(search?.toLowerCase()) || d?.Email?.toLowerCase().includes(search?.toLowerCase())
                                                })
                                                    ?.map((d, i) =>

                                                        <div>
                                                            <th width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>{i + 1}</th>
                                                            <td width="85px" className='min-w-[85px] max-w-[85px]:' style={{ border: "1px solid black" }}>{admission.date.slice(0, -14)}</td>
                                                            <td width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>{admission.courseName}</td>
                                                            <td width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>{admission.batchName}</td>
                                                            <td width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>{admission.employeeName}</td>
                                                            <td width="95px" className='min-w-[95px] max-w-[95px]:' style={{ border: "1px solid black" }}>{admission.headName}</td>
                                                            {/* <td width="150px" className='min-w-[150px] max-w-[150px]:' style={{ border: "1px solid black" }}>{i + 1}</td> */}
                                                            <td width="130px" className='min-w-[130px] max-w-[130px]:' style={{ border: "1px solid black" }}>{d.Name}</td>
                                                            <td width="150px" className='min-w-[150px] max-w-[150px]:' style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                            <td width="220px" className='min-w-[220px] max-w-[220px]:' style={{ border: "1px solid black" }}>{d.Email?.slice(0, -9)}</td>
                                                            <td width="70px" className='min-w-[70px] max-w-[70px]:' style={{ border: "1px solid black" }}>
                                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(d, admission)} >Delete</p>
                                                            </td>
                                                        </div>)
                                            }
                                        </tr>)
                                }

                            </tbody>

                        </table>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default TotalLead;