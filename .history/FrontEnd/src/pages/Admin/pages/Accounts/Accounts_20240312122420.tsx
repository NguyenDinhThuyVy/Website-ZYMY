import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'

function Accounts() {
  return (
    <div className='grid gap-6 grid-cols-12 h-full mt-10 '>
      <div className='grid-col-8 lg:col-span-2'>
        <FormAccount></FormAccount>
      </div>
      <div className='grid-col-4 lg:col-span-10'>
        <MyDoughnutChart></MyDoughnutChart>
      </div>
    </div>
  )
}

export default Accounts
