import { RxDashboard } from 'react-icons/rx'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import path from 'src/constants/path'

export const data = [
  {
    title: 'Dashboard',
    icon: <RxDashboard />,
    link: path.dashboard
  },
  {
    title: 'Accounts',
    icon: <MdOutlineAccountCircle />,
    link: path.dashboard
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: path.dashboard
  },
  {
    title: 'Orders',
    icon: <FaShoppingCart />,
    link: path.dashboard
  }
]
