import { Category } from 'src/types/category.type'
import { ProductList } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'
interface UserData {
  email: string
  name: string
  phone: string
  address: string
  roles: string[]
}

const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  updateUser(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/users/${id}`, userData)
  },
  getUser(id: string[]) {
    return http.get<SuccessResponse<User[]>>(`/admin/users/${id}`)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  },
  getAllProducts() {
    return http.get<SuccessResponse<ProductList[]>>('/admin/products')
  },
  getProduct(id: string[]) {
    return http.get<SuccessResponse<ProductList[]>>(`/admin/products/${id}`)
  },
  updateProduct(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/products/${id}`, userData)
  },
  deleteProduct(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/products/delete/${id}`)
  },
  getcategories() {
    return http.get<SuccessResponse<Category[]>>(`/admin/categories`)
  },
  uploadImage(value: string) {
    return http.post<SuccessResponse<Category[]>>(`/admin/products/upload-image`, value)
  }
}

export default adminApi
