import ProductList from './pages/ProductList'
import Login from './pages/Login'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import { AppContext } from './contexts/app.context'
import Forgetpassword from './pages/Forgetpassword'
import MainLayout from './layouts/MainLayout'

import { useContext } from 'react'
import path from 'src/constants/path'
import ProductDetail from './pages/ProductDetail'
import ProductSearch from './pages/ProductList/ProductSearch'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import PaymentLayout from './layouts/PaymentLayout'
import Payment from './pages/Payment'

import UserLayout from './pages/User/layouts/UserLayout'

import Profile from './pages/User/pages/Profile'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import ChangePassword from './pages/User/pages/ChangePassword'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import LayoutAdmin from './pages/Admin/layouts/LayoutAdmin'
import Dashboard from './pages/Admin/pages/Dashboard'
import Accounts from './pages/Admin/pages/Accounts'
import Products from './pages/Admin/pages/Products'
import Orders from './pages/Admin/pages/Orders'
import ProductCategory from './pages/ProductList/ProductCategory'

// import FormAccountEdit from './pages/Admin/component/FormAccountEdit'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function AdminProtectedRoute() {
  const { isAuthenticated, user } = useContext(AppContext)
  console.log(user)
  return isAuthenticated && user && user.roles.includes('Admin') ? <Outlet /> : <Navigate to='/login' />
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
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
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
      path: path.productCategory,
      element: (
        <MainLayout>
          <ProductCategory></ProductCategory>
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
    },
    {
      path: path.payment,
      element: (
        <PaymentLayout>
          <Payment />
        </PaymentLayout>
      )
    },
    {
      path: '',
      element: <AdminProtectedRoute />,
      children: [
        {
          path: path.admin,
          element: (
            <AdminLayout>
              <LayoutAdmin />
            </AdminLayout>
          ),
          children: [
            {
              path: path.dashboard,
              element: <Dashboard />
            },
            // {
            //   path: path.formAccountEdit,
            //   element: <FormAccountEdit />
            // },
            {
              path: path.accounts,
              element: <Accounts />
            },
            {
              path: path.products,
              element: <Products />
            },
            {
              path: path.orders,
              element: <Orders />
            }
          ]
        }
      ]
    }
  ])
  return routerElement
}
