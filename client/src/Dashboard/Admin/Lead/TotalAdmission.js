import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';

const TotalAdmission = () => {

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
    console.log(courseSearch);
    console.log(batchSearch);

    useEffect(() => {
        fetch(`https://server-farvez999.vercel.app/user/total-admissions?courseSearch=${courseSearch}&batchSearch=${batchSearch}&userSearch=${userSearch}&headSearch=${headSearch}`)
            .then((res) => res.json())
            .then((data) => setAmissions(data));
    }, [courseSearch, batchSearch, userSearch, headSearch]);

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
            <h3 className="text-2xl mb-3">Total Admission</h3>

            <div className='flex flex-wrap items-center my-2'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Course Name</span>
                    </label>
                    <select
                        ref={courseRef}
                        className="select select-sm w-full border-gray-400"
                    >
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

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
                <form>
                    <table className="table-fixed">
                        <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                            <tr>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Course Name</th>
                                <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Batch Name</th>
                                <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>User Name</th>
                                <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Head Name</th>
                                <div>
                                    <th width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>Name</th>
                                    <th width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>Phone</th>
                                    <th width="300px" className='min-w-[300px] max-w-[300px]:' style={{ border: "1px solid black" }}>Email</th>
                                </div>
                            </tr>
                        </thead>

                        <tbody className='w-fit text-xs' style={{ width: "1200px" }}>
                            {
                                admissions?.map((admission, i) =>
                                    <tr
                                        key={admission.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{admission.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.employeeName}   : {admission?.data?.length}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.headName}</td>
                                        {
                                            admission?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d?.Name.toLowerCase().includes(search?.toLowerCase()) || d?.Phone.toLowerCase().includes(search?.toLowerCase()) || d?.Email.toLowerCase().includes(search?.toLowerCase())
                                            })
                                                ?.map((d, i) =>
                                                    <div>
                                                        {/* <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{i + 1}</td> */}
                                                        <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Name}</td>
                                                        <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                        <td width="300px" className='min-w-[300px] max-w-[300px]:' style={{ border: "1px solid black" }}>{d.Email?.slice(0, -9)}</td>
                                                    </div>)
                                        }
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </form>
            </div>

        </div>
    );
};

export default TotalAdmission;