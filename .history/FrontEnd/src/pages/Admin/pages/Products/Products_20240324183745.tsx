import TableData from '../../component/TableData'
import FirstForm from '../../component/FormAdd'
import { useEffect, useState } from 'react'
import adminApi from 'src/apis/admin.api'
import { Product } from 'src/types/product.type'
function Products() {
  const [products, setProducts] = useState([]) // State to store products
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      const productData: any = await adminApi.getAllProducts()
      setProducts(productData) // Update products state with new data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (shouldRefetch) {
      fetchData()
      setShouldRefetch(false) // Đặt shouldRefetch lại sau khi fetchData đã được gọi
    }
  }, [shouldRefetch])
  const handleCreatSuccess = () => {
    setShouldRefetch(true) // Trigger fetchData khi cập nhật thành công
  }
  return (
    <div className='flex flex-col mt-10 gap-2'>
      <FirstForm onCreate={handleCreateProduct}></FirstForm>
      <TableData></TableData>
    </div>
  )
}

export default Products
