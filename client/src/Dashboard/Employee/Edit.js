import React, { useState } from 'react';

const Edit = ({ l, singleLead, setLeads, leadsStatus, setLeadsStatus }) => {
    // console.log(lead);
    // console.log(leads);
    // console.log(setLeads);
    // console.log(leadsStatus);


    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        console.log("field : ", field, "value : ", value);
        const newLeads = singleLead?.data?.map(newLead => newLead.Id === l.Id ? { ...newLead, [field]: value } : newLead)
        console.log(newLeads);
        setLeadsStatus(newLeads);
    }

    return (

        <tr className='active'>
            {/* <th style={{ border: "1px solid black" }}>{1}</th>
            <th style={{ border: "1px solid black" }}>Batch Name</th> */}
            {/* <tr> */}
            <td style={{ border: "1px solid black" }}>{l.Name}</td>
            <td style={{ border: "1px solid black" }}>{l?.Phone}</td>
            <td style={{ border: "1px solid black" }}>{l.Email}</td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="FirstFollowup" defaultValue={l.FirstFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="SecondFollowup" defaultValue={l.SecondFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="ThirdFollowup" defaultValue={l.ThirdFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="NextFollowupDate" defaultValue={l.NextFollowupDate}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="Remark" defaultValue={l.Remark}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="RemarkTwo" defaultValue={l.RemarkTwo}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="AdmissionStates" defaultValue={l.AdmissionStates}></textarea>{ }</td>
            <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button>
            {/* </tr> */}

        </tr>
    );
};

export default Edit;