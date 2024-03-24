import TableData from '../../component/TableData'
import FirstForm from '../../component/FormAdd'
import { useEffect, useState } from 'react'
import adminApi from 'src/apis/admin.api'
function Products() {
  const [products, setProducts] = useState([]) // State to store products

  const fetchData = async () => {
    try {
      const productData: Product = await adminApi.getAllProducts()
      setProducts(productData) // Update products state with new data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData() // Fetch data on initial render
  }, [])

  const handleCreateProduct = async (newProduct) => {
    try {
      await adminApi.createProduct(newProduct) // Call API to create new product
      fetchData() // Fetch updated data after creating product
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }
  return (
    <div className='flex flex-col mt-10 gap-2'>
      <FirstForm onCreate={handleCreateProduct}></FirstForm>
      <TableData></TableData>
    </div>
  )
}

export default Products
