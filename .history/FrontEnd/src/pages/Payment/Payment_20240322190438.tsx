import React, { useState, ChangeEvent } from 'react'

import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import { purchasesStatus } from 'src/constants/purchase'

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

    const checkedPurchaseIdsString = localStorage.getItem('checkedPurchaseIds')

    if (!checkedPurchaseIdsString) {
      console.error('No checked purchase IDs found in sessionStorage')
      return
    }

    // Phân tích cú pháp chuỗi JSON thành một mảng JavaScript
    const checkedPurchaseIds = JSON.parse(checkedPurchaseIdsString)

    try {
      const response = await purchaseApi.shippingAddress(checkedPurchaseIds, address)
      toast.success('Thanh toán thành công')
    } catch (error) {
      toast.success('Thanh toán thất bại công')
      // Xử lý lỗi nếu cần
    }
  }
  return (
    <div>
      <h2>Enter Your Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='street'>Street:</label>
          <input type='text' id='street' name='street' value={address.street} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input type='text' id='city' name='city' value={address.city} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='postalCode'>Postal Code:</label>
          <input
            type='text'
            id='postalCode'
            name='postalCode'
            value={address.postalCode}
            onChange={handleChange}
            required
          />
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
