const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  forgetpassword: '/forgetpassword',
  productSearch: '/productSearch',
  cart: '/cart',
  admin: '/admin',
  dashboard: '/admin/dashboard',
  accounts: '/admin/account',
  products: '/admin/product',
  orders: '/admin/order'
} as const

export default path
