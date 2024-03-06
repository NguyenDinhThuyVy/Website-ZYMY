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
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return <div>ProductSearch</div>
}

export default ProductSearch
