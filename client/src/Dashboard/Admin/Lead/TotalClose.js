import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const TotalClose = () => {

    const [search, setSearch] = useState("");

    const { data: closes = [], refetch } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-close`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div>
            <h3 className="text-2xl mb-3">Total Close</h3>

            <input type="text" className="input input-sm input-bordered w-full max-w-xs mb-5" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input>

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
                                closes?.map((close, i) =>
                                    <tr
                                        key={close.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{close.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{close.employeeName}   : {close?.data?.length}</td>
                                        <td style={{ border: "1px solid black" }}>{close.headName}</td>

                                        {
                                            close?.data?.filter((d) => {
                                                return search?.toLowerCase() === '' ? d : d.Name.toLowerCase().includes(search) || d.Phone.toLowerCase().includes(search) || d.Email.toLowerCase().includes(search);
                                            })
                                                ?.map((d, i) => <tr>
                                                    {/* <td style={{ border: "1px solid black" }}>{i + 1}</td> */}
                                                    <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Name}</td>
                                                    <td width="160px" className='min-w-[160px] max-w-[160px]:' style={{ border: "1px solid black" }}>{d.Phone?.slice(2)}</td>
                                                    <td width="300px" className='min-w-[300px] max-w-[300px]:' style={{ border: "1px solid black" }}>{d.Email?.slice(0, -9)}</td>
                                                </tr>)
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

export default TotalClose;