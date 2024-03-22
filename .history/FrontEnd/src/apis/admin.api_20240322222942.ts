import { Category } from 'src/types/category.type'
import { Order } from 'src/types/order.type'
import { Product, ProductList } from 'src/types/product.type'
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
  createProduct(body: FormData) {
    return http.post<SuccessResponse<Product[]>>('/admin/products', body)
  },
  uploadImage(body: any) {
    return http.post<SuccessResponse<string>>('/admin/products/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadImages(body: any) {
    return http.post<SuccessResponse<string>>('/admin/products/upload-images', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getAllOrder() {
    return http.get<SuccessResponse<Order[]>>('/admin/orders')
  },
  confirm3(id: string[]) {
    return http.get<SuccessResponse<Order[]>>(`/admin/orders/${id}/confirm`)
  }
}

export default adminApi
