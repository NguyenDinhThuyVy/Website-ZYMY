import { Link, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { data } from './data'

interface SidebarItem {
  title: string
  link: string
  icon: React.ReactNode
}

// Ensure type safety for the imported data
const wellTypedData: SidebarItem[] = data

const styles = {
  title: 'mx-4 text-sm whitespace-pre',
  active: 'bg-gray-700 rounded-full',
  link: 'flex items-center justify-start my-1 p-3 w-full hover:text-white',
  close: 'lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all',
  open: 'lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto'
}

export function SidebarItems() {
  const router = useRoutes()
  const collapsed = useSelector((state) => state.menu.collapsed)

  const handleLogout = (title: string) => {
    if (title === 'Logout') {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('auth')
      toast.success('Đăng xuất thành công')
    }
  }

  return (
    <ul className='md:pl-3'>
      {wellTypedData.map((item) => (
        <li key={item.title} onClick={() => handleLogout(item.title)}>
          <Link href={item.link} as={item.link}>
            <span className={styles.link}>
              <div className={`p-2 ${item.link === router.pathname ? styles.active : ''}`}>
                <span>{item.icon}</span>
              </div>
              <span className={`${styles.title} ${collapsed ? styles.open : styles.close}`}>{item.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
