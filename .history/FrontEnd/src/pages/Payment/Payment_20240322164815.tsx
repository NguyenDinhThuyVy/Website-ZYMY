import React, { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { Input } from 'antd'

export default function Payment() {
  const navigate = useNavigate()

  // State for address form fields
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

    const checkedPurchaseIdsString = sessionStorage.getItem('checkedPurchaseIds')

    if (!checkedPurchaseIdsString) {
      console.error('No checked purchase IDs found in sessionStorage')
      return
    }

    // Phân tích cú pháp chuỗi JSON thành một mảng JavaScript
    const checkedPurchaseIds = JSON.parse(checkedPurchaseIdsString)
    // Gửi thông tin địa chỉ giao hàng
    try {
      const response = await purchaseApi.shippingAddress(checkedPurchaseIds, address)
      console.log('Shipping address response:', response)

      navigate('/')
    } catch (error) {
      console.error('Error while shipping address:', error)
      // Xử lý lỗi nếu cần
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-5'>
        <div className=' flex gap-3 items-center'>
          <label htmlFor='street' className='text-sm'>
            Street:
          </label>
          <Input value={address.city} onChange={handleChange} required />
        </div>
        <div className=' flex gap-5 items-center'>
          <label htmlFor='city' className='text-sm'>
            City :
          </label>
          <Input value={address.city} onChange={handleChange} className='w-[381px]' required />
        </div>
        <div className=' flex gap-3 items-center'>
          <label htmlFor='postalCode'>Code:</label>
          <Input value={address.postalCode} onChange={handleChange} required id='postalCode' />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input type='text' id='phone' name='phone' value={address.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='paymentMethod'>Payment Method:</label>
          <select id='paymentMethod' name='paymentMethod' value={address.paymentMethod} onChange={handleChange}>
            <option value='cash'>Cash</option>
            <option value='online'>Online</option>
          </select>
        </div>
        <button type='submit'>Complete</button>
      </form>
    </div>
  )
}
