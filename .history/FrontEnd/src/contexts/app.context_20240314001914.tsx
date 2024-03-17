import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS, getUser } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null | any
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  user: User | null
  setUser: (user: User | null) => void
}

const initialUserState: User = {
  _id: '', // Thay thế bằng giá trị ID mặc định hoặc trống
  roles: ['User'], // Có thể thêm 'Admin' vào mảng này nếu bạn muốn người dùng mẫu có cả hai vai trò
  email: '', // Thay thế bằng giá trị mặc định hoặc trống
  name: '', // Thay thế bằng giá trị mặc định hoặc trống
  date_of_birth: '', // Thay thế bằng giá trị mặc định hoặc trống
  avatar: '', // Thay thế bằng giá trị mặc định hoặc trống
  address: '', // Thay thế bằng giá trị mặc định hoặc trống
  phone: '', // Thay thế bằng giá trị mặc định hoặc trống
  createdAt: '', // Thay thế bằng giá trị mặc định hoặc trống
  updatedAt: '' // Thay thế bằng giá trị mặc định hoặc trống
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
  user: getUser(),
  setUser: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [user, setUser] = useState<User | null>(initialUserState)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
