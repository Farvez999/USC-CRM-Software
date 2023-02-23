import React, { useState } from 'react';

const Edit = ({ l, singleLead, setLeads, leadsStatus, setLeadsStatus }) => {
    // console.log(lead);
    // console.log(leads);
    // console.log(setLeads);
    // console.log(leadsStatus);


    const handleInputChange = event => {
        const field = event.target.name;
        console.log(field);
        const value = event.target.value;
        console.log(value);
        console.log("field : ", field, "value : ", value);
        const newLeads = singleLead?.data?.map(newLead => newLead.Id === l.Id ? { ...newLead, [field]: value } : newLead)
        // console.log(newLeads);
        setLeadsStatus(newLeads);
    }

    return (
        <tr className='active text-xs'>
            <td style={{ border: "1px solid black" }}>{l.Name}</td>
            <td style={{ border: "1px solid black" }}>{l?.Phone}</td>
            <td style={{ border: "1px solid black" }}>{l.Email}</td>
            <td style={{ border: "1px solid black" }}>
                <input onChange={handleInputChange} type="date" name="FirstFollowup" placeholder='First Follow up' defaultValue={l.FirstFollowup}></input></td>
            <td style={{ border: "1px solid black" }}>
                <input onChange={handleInputChange} type="date" name="SecondFollowup" placeholder='Second Follow up' defaultValue={l.SecondFollowup}></input></td>
            <td style={{ border: "1px solid black" }}>
                <input onChange={handleInputChange} type="date" name="ThirdFollowup" placeholder='Third Follow up' defaultValue={l.ThirdFollowup}></input></td>
            <td style={{ border: "1px solid black" }}>
                <input onChange={handleInputChange} type="date" name="NextFollowupDate"
                    placeholder='Next Follow Date' defaultValue={l.NextFollowupDate}></input></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} type="date" name="Remark" placeholder='Remark' defaultValue={l.Remark}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} type="date" name="RemarkTwo" placeholder='Remark Two' defaultValue={l.RemarkTwo}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} type="date" name="AdmissionStates" placeholder='Admission States' defaultValue={l.AdmissionStates}></textarea>{ }</td>


            <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button>




        </tr>
    );
};

export default Edit;