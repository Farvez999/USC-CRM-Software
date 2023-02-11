import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import { Data } from './Data';
import _, { pad } from 'lodash'
import { toast } from 'react-hot-toast';



const LeadUpload = () => {

    // All select Checkbox 
    const [allChecked, setAllChecked] = useState(false)


    // pagination
    const pageSize = 10;
    const [paginationData, setPaginationData] = useState()
    const [currentPage, setcurrentPage] = useState(1)
    // console.log(paginationData);

    const [employeeName, setEmployeeName] = useState('')
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
            // console.log(data);
            setExcelData(data);
            setPaginationData(_(data).slice(0).take(pageSize).value())
        }
        else {
            setExcelData(null);
        }
    }

    const handleSelect = (e) => {
        setEmployeeName(e.target.value);
    }


    const handleAdded = () => {
        const ccc = paginationData.filter(cd => cd.isChecked === true);
        const personalData = {
            data: ccc,
            employeeName
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
        paginationData.map(pd => pd?.FirstName === name ? pd.isChecked = e.target.checked : pd)
        setPaginationData(paginationData)
    }

    return (
        <div className="container">

            {/* upload file section */}
            <div className='form'>
                <form className='form-group' autoComplete="off"
                    onSubmit={handleSubmit}>
                    <label><h5>Upload Excel file</h5></label>
                    <select className="select w-full max-w-xs" onChange={handleSelect}>
                        <option disabled selected>Select User</option>
                        <option>Sumaiya</option>
                        <option>Sonia</option>
                    </select>
                    <button onClick={handleAdded} type="submit">Added</button>
                    <br></br>
                    <input type='file' className='form-control'
                        onChange={handleFile} required></input>
                    {excelFileError && <div className='text-danger'
                        style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                    <button type='submit' className='btn btn-success'
                        style={{ marginTop: 5 + 'px' }}>Submit</button>
                </form>
            </div>

            <br></br>
            <hr></hr>

            {/* All Select checkbox */}
            <form className="form w-100">
                <h3>Select Users</h3>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        checked={allChecked}
                        onChange={toggle}
                    />
                    <label className="form-check-label ms-2">All Select</label>
                </div>
            </form>

            {/* view file section */}
            <h5>View Excel file</h5>
            <div className='viewer'>
                {excelData === null && <>No file selected</>}
                {excelData !== null && (
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Select</th>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>First Name</th>
                                    <th scope='col'>Last Name</th>
                                    <th scope='col'>Gender</th>
                                    <th scope='col'>Country</th>
                                    <th scope='col'>Age</th>
                                    <th scope='col'>Date</th>
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