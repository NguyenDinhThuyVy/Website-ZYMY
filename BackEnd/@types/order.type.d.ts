interface Address {
  street: string
  city: string
  postalCode: string
  phone: string
}

interface Order {
  status: { type: Number }
  shippingAddress: Address[]
}
