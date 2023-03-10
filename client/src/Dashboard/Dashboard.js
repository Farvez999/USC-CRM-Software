import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, PieChart, Pie, Cell
} from "recharts";
import { AuthContext } from '../contexts/AuthProvider';


const Dashboard = () => {

    const { user } = useContext(AuthContext)

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });

    console.log(users);

    const { data: admissions = [] } = useQuery({
        queryKey: ['admissions'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-admissions`);
            const data = await res.json();
            return data;
        }
    });



    const { data: closes = [] } = useQuery({
        queryKey: ['closes'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-close`);
            const data = await res.json();
            return data;
        }
    });

    const { data: onlineStudents = [] } = useQuery({
        queryKey: ['onlineStudents'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-online-student`);
            const data = await res.json();
            return data;
        }
    });

    const { data: offlineStudents = [] } = useQuery({
        queryKey: ['offlineStudents'],
        queryFn: async () => {
            const res = await fetch(`https://server-farvez999.vercel.app/user/total-offline-student`);
            const data = await res.json();
            return data;
        }
    });

    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: 'Our Locations',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: marker,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: 'Open 9.00 am to 5.00pm everyday',
            // icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]

    return (
        <div>

            <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    cardData.map(card =>
                        <div className={`card text-white p-6 md:card-side shadow-xl ${card.bgClass}`}>
                            <figure>
                                <img src={card.icon} alt="Movie" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{card.name}</h2>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>



            <h2 className='text-2xl font-bold'>Hello {user.displayName} !</h2>

            <div className='flex flex-row flex-wrap my-2 items-center'>

                <PieChart width={500} height={400}>
                    <Pie
                        data={data}
                        cx={250}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>

                <div className="overflow-auto" style={{ width: "500px", height: "300px" }}>
                    <table className="table w-full">
                        <thead className='sticky top-0'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, i) =>
                                    <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <th>{user.name}</th>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>


            </div>

            <div className='flex flex-row flex-wrap my-2'>
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={admissions}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="batchName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="data.length" fill="#0088FE" />
                        {/* <Bar dataKey="batchName" fill="#82ca9d" /> */}
                    </BarChart>
                    <h2>Total Admissions</h2>
                </div>

                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={closes}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="batchName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="data.length" fill="#FFBB28" />
                        {/* <Bar dataKey="batchName" fill="#82ca9d" /> */}
                    </BarChart>
                    <h2>Total Close</h2>
                </div>

                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={onlineStudents}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="batchName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="data.length" fill="#00C49F" />
                        {/* <Bar dataKey="batchName" fill="#82ca9d" /> */}
                    </BarChart>
                    <h2>Total Online Student</h2>
                </div>

                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={offlineStudents}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="batchName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="data.length" fill="#FF8042" />
                        {/* <Bar dataKey="batchName" fill="#82ca9d" /> */}
                    </BarChart>
                    <h2>Total Offline Student</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;