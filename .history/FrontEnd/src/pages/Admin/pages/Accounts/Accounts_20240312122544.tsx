import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'

function Accounts() {
  return (
    <div className='flex  '>
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
