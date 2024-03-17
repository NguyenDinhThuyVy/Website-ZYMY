import { Product } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'

// interface BodyUpdateUser
//   extends Omit<
//     User,
//     '_id' | 'date_of_birth' | 'createdAt' | 'updatedAt' | 'email' | 'name' | 'avatar' | 'address' | 'phone'
//   > {
//   password?: string
//   newPassword?: string
// }
const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  updateUser(id: string[]) {
    return http.put<SuccessResponse<User>>(`/user/update-me/${id}`)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  },
  getAllProducts() {
    return http.get<SuccessResponse<Product[]>>('/admin/products')
  }
}

export default adminApi
