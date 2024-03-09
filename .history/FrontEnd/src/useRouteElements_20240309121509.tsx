import ProductList from './pages/ProductList'
import Login from './pages/Login'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import { AppContext } from './contexts/app.context'
import Forgetpassword from './pages/Forgetpassword'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import path from 'src/constants/path'
import ProductDetail from './pages/ProductDetail'
import ProductSearch from './pages/ProductList/ProductSearch'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import Admin from './pages/Admin'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function UseRouterElement() {
  const routerElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.forgetpassword,
          element: (
            <RegisterLayout>
              <Forgetpassword />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: '',
          index: true,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        },
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        },
        {
          path: path.productSearch,
          index: true,
          element: (
            <MainLayout>
              <ProductSearch />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },

    {
      path: path.admin,
      element: (
        <MainLayout>
          <Admin />
        </MainLayout>
      )
    }
  ])
  return routerElement
}
