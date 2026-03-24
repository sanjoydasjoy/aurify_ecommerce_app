import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchList = async () => {
    try {
      setLoading(true)

      const response = await axios.get(backendURL + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      if (!window.confirm('Remove this product from catalog?')) return

      const response = await axios.post(backendURL + '/api/product/remove', {id}, {headers: {token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  return (
    <>
      <div className='admin-card rounded-2xl p-5 sm:p-6'>
      <p className='mb-4 text-lg font-semibold text-slate-800'>All Products List</p>
      <div className='flex flex-col gap-2'>



        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] item-center py-2 px-3 border border-slate-200 bg-slate-50 text-sm rounded-lg' >
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

      {loading && <p className='text-sm text-slate-500 py-4'>Loading products...</p>}

      {!loading && !list.length && <p className='text-sm text-slate-500 py-4'>No products found.</p>}

      {
        !loading && list.map((item)=> (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border border-slate-200 rounded-lg text-sm' key={item._id}>
            <img className='w-12 h-12 object-cover rounded-md border border-slate-200' src={item.image?.[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-sm text-rose-600 font-medium'>Remove</button>
          </div>
        ))
      }

      </div >
      </div>
    </>
  )
}

export default List