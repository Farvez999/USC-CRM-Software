import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'

const MyLead = () => {

    const { user } = useContext(AuthContext)
    console.log(user)
    const [isloader, setIsloader] = useState(false)

    const navigate = useNavigate()

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/leads/${user.displayName}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    console.log(products);

    return (
        <div>
            <h3 className="text-3xl mb-5">My Leads : {products?.data?.length}</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>FirstFollowup</th>
                            <th>SecondFollowup</th>
                            <th>ThirdFollowup</th>
                            <th>NextFollowupDate</th>
                            <th>Remark</th>
                            <th>RemarkTwo</th>
                            <th>AdmissionStates</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.data?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.Name}</td>
                                <td>{product?.Phone}</td>
                                <td>{product.Email}</td>
                                <td>
                                    <input type="" name="" value={product.FirstFollowup}></input>
                                </td>
                                <td>{product.SecondFollowup}</td>
                                <td>{product.ThirdFollowup}</td>
                                <td>{product.NextFollowupDate}</td>
                                <td>{product.Remark}</td>
                                <td>{product.RemarkTwo}</td>
                                <td>{product.AdmissionStates}</td>

                                {/* {

                                product.paid ? <td className='text-red-600'>{'sold'}</td> :
                                    product.advertise ?
                                        <td><button className="btn btn-outline btn-error btn-xs" onClick={() => removeAdvertise(product._id)}>remove advertise</button></td>

                                        :

                                        <td><button className="btn  btn-primary btn-xs" onClick={() => addAdvertise(product._id)}>add advertise</button></td>

                            }
                            <td>
                                <label onClick={() => handleDelete(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                            </td> */}
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* {
            deletingDoctor && <ConfirmastionModal
                title={`Are you sure you want to delete?`}
                message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                successAction={handleDeleteDoctor}
                successButtonName="Delete"
                modalData={deletingDoctor}
                closeModal={closeModal}
            >
            </ConfirmastionModal>
        } */}
        </div>
    );
};

export default MyLead;