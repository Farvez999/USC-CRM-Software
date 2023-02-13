import React, { useState } from 'react';

const Edit = ({ lead, leads, setLeads, leadsStatus, setLeadsStatus }) => {
    // console.log(lead);
    // console.log(leads);
    // console.log(setLeads);
    // console.log(leadsStatus);


    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        console.log("field : ", field, "value : ", value);
        const newLeads = leads?.data.map(newLead => newLead.Id === lead.Id ? { ...newLead, [field]: value } : newLead)
        console.log(newLeads);
        setLeadsStatus(newLeads);
    }

    return (
        <tr className='active'>
            <th style={{ border: "1px solid black" }}>{1}</th>
            <td style={{ border: "1px solid black" }}>{lead.Name}</td>
            <td style={{ border: "1px solid black" }}>{lead?.Phone}</td>
            <td style={{ border: "1px solid black" }}>{lead.Email}</td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="FirstFollowup" defaultValue={lead.FirstFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="SecondFollowup" defaultValue={lead.SecondFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="ThirdFollowup" defaultValue={lead.ThirdFollowup}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="NextFollowupDate" defaultValue={lead.NextFollowupDate}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="Remark" defaultValue={lead.Remark}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="RemarkTwo" defaultValue={lead.RemarkTwo}></textarea></td>
            <td style={{ border: "1px solid black" }}>
                <textarea onChange={handleInputChange} className='textarea textarea-secondary' type="text" name="AdmissionStates" defaultValue={lead.AdmissionStates}></textarea>{ }</td>
            <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button>
        </tr>
    );
};

export default Edit;