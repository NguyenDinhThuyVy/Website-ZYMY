import Header from 'src/components/Header'

import SidebarItems from 'src/components/SiderbarItem/SiderbarItem'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
