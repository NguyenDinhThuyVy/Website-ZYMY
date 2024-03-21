import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform any validation if needed

    // Redirect to the next page (e.g., order summary page)
    navigate('/order-summary')
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
        <button type='submit'>Continue</button>
      </form>
    </div>
  )
}
