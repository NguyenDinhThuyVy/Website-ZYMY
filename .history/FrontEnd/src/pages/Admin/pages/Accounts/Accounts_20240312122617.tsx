import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'

function Accounts() {
  return (
    <div className='flex  gap-20 mt-20 ml-10'>
      <div className=''>
        <FormAccount></FormAccount>
      </div>
      <div className=''>
        <MyDoughnutChart></MyDoughnutChart>
      </div>
    </div>
  )
}

export default Accounts
