import MyDoughnutChart from '../../component/Chart'
import TableHistory from '../../component/TableHistory'

function Orders() {
  return (
    <div className='flex gap-5 mt-20 ml-5'>
      <TableHistory></TableHistory>
      <MyDoughnutChart role={role}></MyDoughnutChart>
    </div>
  )
}

export default Orders
