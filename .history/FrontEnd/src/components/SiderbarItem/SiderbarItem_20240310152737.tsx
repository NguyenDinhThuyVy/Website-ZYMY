import { useRoutes } from 'react-router-dom'
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
  // ... your styles
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
