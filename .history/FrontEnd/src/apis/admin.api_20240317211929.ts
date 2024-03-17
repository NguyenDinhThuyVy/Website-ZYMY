import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'

interface BodyUpdateUser
  extends Omit<
    User,
    '_id' | 'date_of_birth' | 'createdAt' | 'updatedAt' | 'email' | 'name' | 'avatar' | 'address' | 'phone'
  > {
  password?: string
  newPassword?: string
}
const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  updateProfile(body: BodyUpdateUser) {
    return http.put<SuccessResponse<User>>('/user/update-me/${id}', body)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  }
}

export default adminApi
