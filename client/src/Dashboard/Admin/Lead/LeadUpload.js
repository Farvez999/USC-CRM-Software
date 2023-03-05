import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import { Data } from './Data';
import _, { pad } from 'lodash'
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';



const LeadUpload = () => {

    // All select Checkbox 
    const [allChecked, setAllChecked] = useState(false)


    // pagination
    const pageSize = 10;
    const [paginationData, setPaginationData] = useState()
    const [currentPage, setcurrentPage] = useState(1)
    // console.log(paginationData);

    const [courseName, setCourseName] = useState('')
    const [batchName, setBatchName] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [headName, setHeadName] = useState('')

    const [checkData, setCheckData] = useState([]);
    // console.log(checkData);


    // on change states
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    // handle File
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        // console.log(selectedFile);
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data);
            setExcelData(data);
            setPaginationData(_(data).slice(0).take(pageSize).value())
        }
        else {
            setExcelData(null);
        }
    }

    const handleCourseName = (e) => {
        setCourseName(e.target.value);
    }

    const { data: coursesName = [] } = useQuery({
        queryKey: ['coursesName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/course-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    const handleBatchName = (e) => {
        setBatchName(e.target.value);
    }

    const { data: batchsName = [] } = useQuery({
        queryKey: ['batchsName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/batch-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    const handleSelectUser = (e) => {
        setEmployeeName(e.target.value);
    }

    const { data: usersName = [] } = useQuery({
        queryKey: ['usersName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user-name-setting`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(usersName);

    const handleSelectHead = (e) => {
        setHeadName(e.target.value);
    }

    const { data: headsName = [] } = useQuery({
        queryKey: ['headsName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/head-name-setting`);
            const data = await res.json();
            return data;
        }
    });



    const handleAdded = () => {
        const ccc = paginationData.filter(cd => cd.isChecked === true);
        const personalData = {
            data: ccc,
            courseName,
            batchName,
            employeeName,
            headName
        }

        fetch(`http://localhost:5000/personal-data-add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // if (data.acknowledged) {
                //     console.log(data);
                //     // setIsloader(false)
                toast.success('Database Data added successfully')
                //     // navigate('/dashboard/sellerProducts')
                // }
            })
        // .catch(error => { toast.error(error.message); setIsloader(false) })
    }


    // pagination
    const pageCount = excelData !== null && Math.ceil(excelData.length / pageSize);
    // console.log(pageCount);
    if (pageCount === 1) { return null }
    const pages = _.range(1, pageCount + 1)

    const paginitaion = (pageNo) => {
        setcurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        const paginationD = _(excelData).slice(startIndex).take(pageSize).value();
        setPaginationData(paginationD)
    }

    // All select checkbox 
    const toggle = (e) => {
        console.log(e.target.checked);
        setAllChecked(e.target.checked)
        if (e.target.checked) {
            paginationData.map(data => data.isChecked = true)
        }
        else {
            paginationData.map(data => data.isChecked = false)
        }
        console.log(paginationData);
    }

    // single checkbox 
    const handleChange = (e, name) => {
        console.log(e.target.checked);
        paginationData.map(pd => pd?.Name === name ? pd.isChecked = e.target.checked : pd)
        setPaginationData(paginationData)
    }

    return (
        <div className="container">

            {/* upload file section */}
            <div className='form'>
                <form className='form-group' autoComplete="off"
                    onSubmit={handleSubmit}>
                    <label className='text-left'><h5>Upload Excel file</h5></label>

                    <div className='flex items-center'>
                        <input type='file' className='form-control'
                            onChange={handleFile} required></input>
                        {excelFileError && <div className='text-danger'
                            style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                        <button type='submit' className='btn btn-success btn-sm'
                            style={{ marginTop: 5 + 'px' }}>Add Import File</button>
                    </div>

                    <br></br>
                </form>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <select className="select select-bordered select-sm w-1/6 max-w-xs" required onChange={handleCourseName}>
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

                    <select className="select select-bordered select-sm w-1/6 max-w-xs" required onChange={handleBatchName}>
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

                    <select className="select select-bordered select-sm w-1/6 max-w-xs" required onChange={handleSelectUser}>
                        {/* <option disabled selected>Select User</option> */}
                        {
                            usersName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.userName}>
                                    {user.userName}
                                </option>
                            )
                        }
                        {/* <option disabled selected>Select User</option>
                            <option>Sumaiya</option>
                            <option>Sonia</option> */}
                    </select>

                    <select className="select select-bordered select-sm w-1/6 max-w-xs" required onChange={handleSelectHead}>
                        {
                            headsName?.map((user) =>
                                <option
                                    key={user._id}
                                    value={user.headName}>
                                    {user.headName}
                                </option>
                            )
                        }
                        {/* <option disabled selected>Select Head</option>
                            <option>Shuvo</option>
                            <option>Nahid</option> */}
                    </select>

                    <button className='btn btn-success btn-sm mx-6' onClick={handleAdded} type="submit">Added User or DataBase</button>
                </div>
            </div>

            <br></br>
            <hr></hr>

            {/* All Select checkbox */}
            <form className="flex justify-start form w-100">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        checked={allChecked}
                        onChange={toggle}
                    />
                    <label className="form-check-label ms-2"> All Select</label>
                </div>
            </form>
            <hr></hr>
            {/* view file section */}
            <h5 >View Excel file</h5>
            <div className='viewer'>
                {excelData === null && <>No file selected</>}
                {excelData !== null && (
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Select</th>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>FirstFollowup</th>
                                    <th scope='col'>SecondFollowup</th>
                                    <th scope='col'>ThirdFollowup</th>
                                    <th scope='col'>NextFollowupDate</th>
                                    <th scope='col'>Remark</th>
                                    <th scope='col'>RemarkTwo</th>
                                    <th scope='col'>AdmissionStates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Data
                                    excelData={excelData}
                                    employeeName={employeeName}
                                    checkData={checkData}
                                    setCheckData={setCheckData}
                                    paginationData={paginationData}
                                    handleChange={handleChange} />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination  */}
            <div className='pagination flex items-1 items-center justify-center'>
                {
                    pages.map((page) => (
                        <p className={
                            page === currentPage ? 'bg-sky-500 p-2' : 'mx-2'
                        }
                            onClick={() => paginitaion(page)}
                        >{page}</p>
                    ))
                }

            </div>
        </div>
    );
};

export default LeadUpload;