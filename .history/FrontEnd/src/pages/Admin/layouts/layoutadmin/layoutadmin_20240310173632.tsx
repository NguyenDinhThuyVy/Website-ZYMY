import { Outlet } from 'react-router-dom'
import SiderbarItem from 'src/components/SiderbarItem'

export default function LayoutAdmin() {
  return (
    <div className='h-full'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12 h-full hidden  '>
        <div className='grid-col-md:col-span-4 lg:col-span-2'>
          <SiderbarItem></SiderbarItem>
        </div>
        <div className='grid-col-md:col-span-8 lg:col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
