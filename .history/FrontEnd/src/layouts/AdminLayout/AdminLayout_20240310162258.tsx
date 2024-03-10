import NavHeader from 'src/components/NavHeader'
import SidebarItems from 'src/components/SiderbarItem/SiderbarItem'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div className='flex flex-col'>
      <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white'>
        <NavHeader />
      </div>
      <div className='grid grid-cols-12'>
        <div className='grid-cols-4'>
          <SidebarItems></SidebarItems>
        </div>
        <div className='grid-cols-7'>{children}</div>
      </div>
    </div>
  )
}
