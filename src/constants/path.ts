const path = {
  home: '/',
  user: '/user',
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  productDetail: ':nameId',
  cart: '/cart'
} as const
export default path
