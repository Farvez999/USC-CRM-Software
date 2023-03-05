import React from 'react';

const EditModal = ({ editData, singleLead, setLeadsUpdate, handleUpdate }) => {
    console.log(editData, singleLead);


    const handleInputChange = event => {
        const field = event.target.name;
        console.log(field);
        const value = event.target.value;
        console.log(value);
        console.log("field : ", field, "value : ", value);
        const newLeads = singleLead?.data?.map(newLead => newLead.Id === editData.Id ? { ...newLead, [field]: value } : newLead)
        setLeadsUpdate(newLeads);
    }
    return (
        <>
            <input type="checkbox" id="editModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    {/* <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p> */}
                    <form onSubmit={handleUpdate} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={editData.Name} className="input w-full input-bordered " />

                        <input name="name" type="text" defaultValue={editData.Phone.slice(2)} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={editData.Email} disabled placeholder="Email Address" className="input w-full input-bordered" />

                        <input onChange={handleInputChange} name="FirstFollowup" type="date" defaultValue={editData.FirstFollowup} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="SecondFollowup" type="date" defaultValue={editData.SecondFollowup} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="ThirdFollowup" type="date" defaultValue={editData.ThirdFollowup} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="NextFollowupDate" type="date" defaultValue={editData.NextFollowupDate} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="Remark" type="text" defaultValue={editData.Remark} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="RemarkTwo" type="text" defaultValue={editData.RemarkTwo} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input onChange={handleInputChange} name="AdmissionStates" type="text" defaultValue={editData.AdmissionStates} placeholder="Edit First Follow up" className="input w-full input-bordered" />

                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                        {/* <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button> */}
                    </form>
                </div>

            </div>
        </>
    );
};

export default EditModal;