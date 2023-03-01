import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserSetting = () => {

    const [userName, setUserName] = useState()
    const [headName, setHeadName] = useState()
    const [courseName, setCourseName] = useState()
    const [batchName, setBatchName] = useState()
    console.log(headName);

    const handleUser = (e) => {
        setUserName(e.target.value)
    }

    const handleHead = (e) => {
        setHeadName(e.target.value)
    }

    const handleCourse = (e) => {
        setCourseName(e.target.value)
    }

    const handleBatch = (e) => {
        setBatchName(e.target.value)
    }

    const handleUserAdd = () => {
        const addUserName = {
            userName
        }

        fetch(`http://localhost:5000/user-name-setting`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addUserName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${userName} added successfully`)
            })
    }

    const handleHeadAdd = () => {
        const addHeadName = {
            headName
        }

        fetch(`http://localhost:5000/head-name-setting`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addHeadName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${headName} added successfully`)
            })
    }

    const handleCourseAdd = () => {
        const addCourseName = {
            courseName
        }

        fetch(`http://localhost:5000/course-name-setting`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addCourseName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${courseName} added successfully`)
            })
    }

    const handleBatchAdd = () => {
        const addBatchName = {
            batchName
        }

        fetch(`http://localhost:5000/batch-name-setting`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addBatchName)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`${batchName} added successfully`)
            })
    }

    return (
        <div>
            <div className='flex flex-wrap justify-around my-6'>
                <div className='m-2'>
                    <h3 className='text-left my-2 ml-5'>Add User Name !</h3>
                    <input onChange={handleUser} type="text" placeholder="Type User Name" className="input input-bordered input-md w-full max-w-xs" />
                    <button onClick={handleUserAdd} className="btn btn-md m-2">Add User Name</button>
                </div>

                <div className='m-2'>
                    <h3 className='text-left my-2 ml-5'>Add Head Name !</h3>
                    <input onChange={handleHead} type="text" placeholder="Type Head Name" className="input input-bordered input-md w-full max-w-xs" />
                    <button onClick={handleHeadAdd} className="btn btn-md m-2">Add Head Name</button>
                </div>

                <div className='m-2'>
                    <h3 className='text-left my-2 ml-7'>Add Course Name !</h3>
                    <input onChange={handleCourse} type="text" placeholder="Type Course Name" className="input input-bordered input-md w-full max-w-xs" />
                    <button onClick={handleCourseAdd} className="btn btn-md m-2">Add Course Name</button>
                </div>

                <div className='m-2'>
                    <h3 className='text-left my-2 ml-6'>Add Batch Name !</h3>
                    <input onChange={handleBatch} type="text" placeholder="Type Batch Name" className="input input-bordered input-md w-full max-w-xs" />
                    <button onClick={handleBatchAdd} className="btn btn-md m-2">Add Batch Name</button>
                </div>
            </div>
            <div>
                <p>New to USC CRM Software <Link className='text-secondary' to="/signup">Create new Account</Link></p>
            </div>
        </div>
    );
};

export default UserSetting;