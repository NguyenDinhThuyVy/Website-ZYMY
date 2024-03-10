import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'

import SidebarItems from 'src/components/SiderbarItem/SiderbarItem'
// interface Props {
//   children?: React.ReactNode
// }
export default function AdminLayout() {
  return (
    <div className='flex flex-col h-screen '>
      <div className=' bg-gradient-to-b from-yellow to-rose-400  text-white'>
        <Header></Header>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12 h-full'>
        <div className='grid-col-md:col-span-4 lg:col-span-2'>
          <SidebarItems></SidebarItems>
        </div>
        <div className='grid-col-md:col-span-8 lg:col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
