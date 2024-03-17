import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'
const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  deleteUser(UserIds: string[]) {
    return http.delete<SuccessResponse<User[]>>(`${URL}`, {
      data: UserIds
    })
  }
}

export default adminApi
