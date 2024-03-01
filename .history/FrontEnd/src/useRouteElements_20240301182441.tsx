import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'

import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import Forgetpassword from './pages/Forgetpassword'
export default function UseRouterElement() {
  const routerElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/forgetpassword',
      element: (
        <RegisterLayout>
          <Forgetpassword />
        </RegisterLayout>
      )
    }
  ])
  return routerElement
}
