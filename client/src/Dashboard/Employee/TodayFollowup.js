import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const TodayFollowup = () => {

    const { user } = useContext(AuthContext)
    const [todayFollowup, setTodayFollowup] = useState([])
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

    return (
        <div>
            <h3 className="text-3xl mb-5">Today Followup Student</h3>

            {/* <input type="text" className="input input-bordered w-full max-w-xs mb-5" onChange={(e) => setSearch(e.target.value)} placeholder='Search By Name, Phone, Email'></input> */}

            <div className="overflow-x-auto">
                <form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black" }}>#</th>
                                <th style={{ border: "1px solid black" }}>Course Name</th>
                                <th style={{ border: "1px solid black" }}>Batch Name</th>
                                <th style={{ border: "1px solid black" }}>User Name</th>
                                <th style={{ border: "1px solid black" }}>Head Name</th>
                                <th style={{ border: "1px solid black" }}>Student Information</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                todayFollowup.map((todayFollow, i) =>
                                    <tr key={todayFollow.Id}>
                                        <th style={{ border: "1px solid black" }}>{i + 1}</th>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.courseName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.batchName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.employeeName}</td>
                                        <td style={{ border: "1px solid black" }}>{todayFollow.headName}</td>

                                        {
                                            todayFollow?.data?.map(d =>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }}>{d.Name}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.Phone}</td>
                                                    <td style={{ border: "1px solid black" }}>{d.Email}</td>
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
};

export default TodayFollowup;