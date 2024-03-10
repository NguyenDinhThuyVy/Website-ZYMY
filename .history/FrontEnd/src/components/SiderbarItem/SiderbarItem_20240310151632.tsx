import routes from '@/constant/routes'
import { RxDashboard } from 'react-icons/rx'

export const data = [
  {
    title: 'Dashboard',
    icon: <RxDashboard />,
    link: routes.DASHBOARD
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
