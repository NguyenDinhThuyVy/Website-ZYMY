import { RxDashboard } from 'react-icons/rx'
import path from 'src/constants/path'

export const data = [
  {
    title: 'Dashboard',
    icon: <RxDashboard />,
    link: path.dashboard
  },
  {
    title: 'Accounts',
    icon: <AccountIcon />,
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
