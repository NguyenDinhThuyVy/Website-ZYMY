import NavHeader from 'src/components/NavHeader'
import SidebarItems from 'src/components/SiderbarItem/SiderbarItem'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div className='flex flex-col h-screen'>
      <div className=' bg-gradient-to-b from-yellow to-rose-300 text-white'>
        <NavHeader />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12 h-full'>
        <div className='grid-col-md:col-span-4 lg:col-span-2'>
          <SidebarItems></SidebarItems>
        </div>
        <div className='grid-col-md:col-span-8 lg:col-span-10'>{children}</div>
      </div>
    </div>
  )
}
