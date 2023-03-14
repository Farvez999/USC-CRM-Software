import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyAdmission = () => {

    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("");

    const { data: admissions = [], refetch } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/admissions/${user.displayName}`);
            const data = await res.json();
            return data;
        }
    });


    return (
        <div>
            <h3 className="text-2xl mb-3">My Admissions</h3>

            <input type="text" className="input input-bordered input-sm w-full max-w-xs mb-3" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

            <div className="overflow-auto" style={{ height: '430px', width: "1050px" }}>
                <form>
                    <table className="table-fixed">
                        <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                            <tr>
                                <div>
                                    <th width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>#</th>
                                    <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Date</th>
                                    <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Course Name</th>
                                    <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Batch Name</th>
                                    <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>User Name</th>
                                    <th width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>Head Name</th>
                                    <th width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>Name</th>
                                    <th width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>Phone</th>
                                    <th width="300px" className='min-w-[300px] max-w-[300px]:' style={{ border: "1px solid black" }}>Email</th>
                                </div>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                admissions?.map((admission) =>
                                    <tr key={admission.Id}>
                                        {/* <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{admission.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.employeeName}</td>
                                        <td style={{ border: "1px solid black" }}>{admission.headName}</td> */}

                                        {
                                            admission?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search?.toLowerCase()) || d.Phone.toLowerCase().includes(search?.toLowerCase()) || d.Email.toLowerCase().includes(search?.toLowerCase())
                                            })
                                                ?.map((d, i) =>
                                                    <div>
                                                        <th width="20px" className='min-w-[20px] max-w-[20px]:' style={{ border: "1px solid black" }}>{i + 1}</th>
                                                        <td width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>{admission?.date?.slice(0, -14)}</td>
                                                        <td width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>{admission.courseName}</td>
                                                        <td width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>{admission.batchName}</td>
                                                        <td width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>{admission.employeeName}</td>
                                                        <td width="105px" className='min-w-[105px] max-w-[105px]:' style={{ border: "1px solid black" }}>{admission.headName}</td>
                                                        <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Name}</td>
                                                        <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                        <td width="300px" className='min-w-[300px] max-w-[300px]:' style={{ border: "1px solid black" }}>{d.Email?.slice(0, -9)}</td>
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

        </div>
    );
};

export default MyAdmission;