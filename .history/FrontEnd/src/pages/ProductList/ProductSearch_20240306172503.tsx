import Product from './Product'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'

import Pagination from 'src/components/Pagination'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/category.api'

import { ProductListConfig } from 'src/types/product.type'
import ItemTop from './ItemTop'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductSearch() {
  return <div>ProductSearch</div>
}

export default ProductSearch
