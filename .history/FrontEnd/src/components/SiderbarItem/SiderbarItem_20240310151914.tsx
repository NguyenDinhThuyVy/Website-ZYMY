import { RxDashboard } from 'react-icons/rx'
import { MdOutlineAccountCircle } from 'react-icons/md'
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
    link: routes.ACCOUNT
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: routes.PRODUCT
  },
  {
    title: 'Orders',
    icon: <OrderIcon />,
    link: routes.ORDER
  },
  {
    title: 'Logout',
    icon: <CiLogout size={26} />,
    link: '/'
  }
]
