import routes from '@/constant/routes'

export const data = [
  {
    title: 'Dashboard',
    icon: <DashBoardIcon />,
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
