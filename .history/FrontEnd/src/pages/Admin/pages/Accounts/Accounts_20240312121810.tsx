import MyDoughnutChart from '../../component/Chart'

function Accounts() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-12 h-full  '>
      <div className='grid-col-md:col-span-4 lg:col-span-2'>
        <SiderbarItem></SiderbarItem>
      </div>
      <div className='grid-col-md:col-span-8 lg:col-span-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default Accounts
