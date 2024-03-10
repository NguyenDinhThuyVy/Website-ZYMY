import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface SidebarItem {
  title: string
  link: string
  icon: React.ReactNode
}

const styles = {
  // ... your styles
}

const SidebarItems: React.FC = () => {
  const navigate = useNavigate()
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
      {data.map((item) => (
        <li key={item.title} onClick={() => handleLogout(item.title)}>
          <a href={item.link} className={styles.link}>
            <div className={`p-2 ${item.link === window.location.pathname ? styles.active : ''}`}>
              <span>{item.icon}</span>
            </div>
            <span className={`${styles.title} ${collapsed ? styles.open : styles.close}`}>{item.title}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SidebarItems
