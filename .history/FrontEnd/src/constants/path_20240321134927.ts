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
  productCategory: '/productCategory',
  cart: '/cart',
  payment: '/payment'
  admin: '/admin',
  dashboard: '/admin/dashboard',
  accounts: '/admin/accounts',
  products: '/admin/products',
  orders: '/admin/orders',
  formAccountEdit: '/admin/accounts/edit',
  formProductEdit: '/admin/products/edit'
} as const

export default path
