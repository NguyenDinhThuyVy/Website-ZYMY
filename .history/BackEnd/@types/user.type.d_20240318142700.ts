interface Address {
  street: string
  city: string
  postalCode: string
  phone: string
}
interface User {
  email: string
  password: string
  name: string
  date_of_birth: string
  addresses: Address[]
  phone: string
  roles: string[]
  avatar?: string
  [key: string]: any
}
