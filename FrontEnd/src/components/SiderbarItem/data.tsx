import { RxDashboard } from 'react-icons/rx'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { BiSolidPackage } from 'react-icons/bi'
import path from 'src/constants/path'

export const data = [
  {
    id: 0,
    title: 'Dashboard',
    icon: <RxDashboard />,
    link: path.dashboard
  },
  {
    id: 1,
    title: 'Accounts',
    icon: <MdOutlineAccountCircle />,
    link: path.accounts
  },
  {
    id: 2,
    title: 'Products',
    icon: <BiSolidPackage />,
    link: path.products
  },
  {
    id: 3,
    title: 'Orders',
    icon: <FaShoppingCart />,
    link: path.orders
  }
]
