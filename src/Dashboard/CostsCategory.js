import React, { useContext } from 'react';
import { BiMoney } from 'react-icons/bi';
import { AuthContext } from '../Context/AuthProvider';
import AddCostCategory from '../Categories/AddCostCategory';
import { Link } from 'react-router-dom/dist';

const CostsCategory = () => {
    const { categories } = useContext(AuthContext);
    const cost = categories.filter(ctg => ctg.type === 'cost');
    return (
        <div>
            {
                cost.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
                    <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Cost Category. Please Create a Cost Category FIrst</h1>
                </div> :
                       <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center m-10">
                       {
                           cost.map(fctg => <Link key={fctg._id} to={`/${fctg?.type}/${fctg?.name}`}> <div class="lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">
       
                               <div class="bg-[#FEE8E2] rounded-full p-3">
                                   <BiMoney className="w-6 h-6 text-red-500"></BiMoney>
       
                               </div>
                               <div class="">
                                   <div class="text-lg font-semibold text-gray-800">{fctg.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                                   <p class="text-gray-700">{fctg.name}</p>
                               </div>
                           </div>
                           </Link>)
                       }
       
       
                   </div>
}
         

            <div className='fixed bottom-10 right-0 flex items-center gap-2'>
               <Link to='/delete-category'>
               <div className='bg-red-700  group w-12 h-12 flex items-center justify-center rounded-full'>
                   <i className='pi pi-trash text-white'></i>
                    </div>
                    </Link>
                <label htmlFor="cost-category-modal">
                  <div className='bg-green-700 group cursor-pointer w-12 h-12 flex items-center justify-center rounded-full'>
                   <i className='pi pi-plus text-white'></i>
                    </div>
                    </label>
               
            </div>

            <AddCostCategory />


        </div>
    );
};

export default CostsCategory;