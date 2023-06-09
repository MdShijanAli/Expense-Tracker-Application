import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';

const AddCostCategory = () => {
    const { categories } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = localStorage.getItem('userEmail');


        const category = {
            name,
            value: 0,
            type: 'cost',
            user: email,
        }

        console.log(category)

        if (categories.find(ctg => ctg.name == category.name)) {
            toast.error("Already Have a Category with your account Like this Name. Please Create a Different Name")
        }
        else {


            fetch(' https://expense-tracker-application-server.vercel.app/categories', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(category)
            })
                .then(res => res.json())
                .then(data => {

                    if (data.acknowledged) {
                        toast.success('COngratulation!! Category Added');
                        // refetch();
                        // navigate('/')
                        window.location.href = '/dashboard/cost-category';
                    }
                    else {
                        toast.error(data.message)
                    }
                })
                .catch(err => {
                    console.log(err);
                })


        }



    };
    return (



        <div>

            <input type="checkbox" id="cost-category-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <label htmlFor="cost-category-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <form onSubmit={handleSubmit}>
                        <h3 className='text-center text-3xl font-semibold mb-10'>Add Cost Category</h3>


                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="name">
                                Category Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nasta,Medical,Bazar etc"
                            />
                        </div>



                        <div className="modal-action">
                            <button htmlFor="cost-category-modal" className="btn">Add Cost Category</button>
                        </div>
                    </form>



                </div>
            </div>




        </div>
    );
};

export default AddCostCategory;