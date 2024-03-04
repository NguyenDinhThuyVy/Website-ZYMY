import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { Category } from 'src/types/category.type'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi
