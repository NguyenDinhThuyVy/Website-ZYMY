import React, { useState, ChangeEvent } from 'react'

import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import { purchasesStatus } from 'src/constants/purchase'
import { Input, Select } from 'antd'

export default function Payment() {
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cash' // Default payment method
  })

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(purchasesInCartData)

    const checkedPurchaseIdsString = localStorage.getItem('checkedPurchaseIds')

    if (!checkedPurchaseIdsString) {
      console.error('No checked purchase IDs found in sessionStorage')
      return
    }

    // Phân tích cú pháp chuỗi JSON thành một mảng JavaScript
    const checkedPurchaseIds = JSON.parse(checkedPurchaseIdsString)

    try {
      // Duyệt qua từng checkedPurchaseId và gửi nó lên API
      for (const checkedPurchaseId of checkedPurchaseIds) {
        const response = await purchaseApi.shippingAddress(checkedPurchaseId, address)
        // Xử lý response ở đây nếu cần
        if (response.status === 200) {
          // Xử lý thành công, ví dụ: cập nhật giao dịch
          // console.log('Shipping address updated successfully')
        } else {
          // Xử lý thất bại, ví dụ: hiển thị thông báo lỗi
          // console.error('Shipping address update failed')
        }
      }

      toast.success('Thanh toán thành công', {
        position: 'top-right',
        autoClose: 1200 // Thời gian tự đóng trong 2 giây
      })

      setTimeout(() => {
        refetch()
      }, 1300)
    } catch (error) {
      toast.error('Thanh toán thất bại')
      // Xử lý lỗi nếu cần
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-5'>
        <div className=' flex gap-4 items-center'>
          <label htmlFor='street' className='text-sm'>
            Street:
          </label>
          <Input value={address.street} onChange={handleChange} required name='street' className='w-[378px]' />
        </div>
        <div className=' flex gap-7 items-center'>
          <label htmlFor='city' className='text-sm'>
            City:
          </label>
          <Input value={address.city} onChange={handleChange} className='w-[378px]' required id='city' name='city' />
        </div>
        <div className=' flex gap-4 items-center'>
          <label htmlFor='postalCode'>Code:</label>
          <Input
            value={address.postalCode}
            onChange={handleChange}
            className='w-[378px]'
            required
            id='postalCode'
            name='postalCode'
          />
        </div>
        <div className=' flex gap-3 items-center'>
          <label htmlFor='phone'>Phone:</label>
          <Input id='phone' value={address.phone} onChange={handleChange} required name='phone' className='w-[378px]' />
        </div>
        <div className=' flex gap-2 items-center'>
          <label htmlFor='paymentMethod'>Payment Method:</label>
          <Select defaultValue='cash' style={{ width: 120 }} disabled options={[{ value: 'cash', label: 'Cash' }]} />
        </div>
        <button
          type='submit'
          className='border-solid border-2 border-red-400 w-[80px] mr-0 bg-red-400 rounded-md text-white p-1 hover:opacity-90'
        >
          Complete
        </button>
      </form>
    </div>
  )
}
