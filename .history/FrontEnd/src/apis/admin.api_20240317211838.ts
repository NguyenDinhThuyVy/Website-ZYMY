import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'

interface BodyUpdateProfile
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
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  }
}

export default adminApi
