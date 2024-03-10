import { RxDashboard } from 'react-icons/rx'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { BiSolidPackage } from 'react-icons/bi'
import path from 'src/constants/path'

export const data = [
  {
    id: 0,
    title: 'Dashboard',
    icon: <RxDashboard />
  },
  {
    id: 1,
    title: 'Accounts',
    icon: <MdOutlineAccountCircle />
  },
  {
    id: 2,
    title: 'Products',
    icon: <BiSolidPackage />
  },
  {
    id: 3,
    title: 'Orders',
    icon: <FaShoppingCart />
  }
]
