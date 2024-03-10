import TableData from '../../component/TableData'
import FirstForm from '../../component/FormAdd'
function Products() {
  return (
    <div className='flex flex-col'>
      <FirstForm></FirstForm>
      <TableData></TableData>
    </div>
  )
}

export default Products
