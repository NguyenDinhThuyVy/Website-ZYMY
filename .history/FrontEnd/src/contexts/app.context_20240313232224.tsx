import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

type UserRole = 'user' | 'admin'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
  userRole: UserRole // Add userRole property
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>> // Add setter
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
  userRole: 'user', // Set default user role
  setUserRole: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    // Update to use checkAdminPrivileges or logic to set isAdmin based on userRole
    const storedRole = localStorage.getItem('userRole')
    return storedRole === 'admin'
  })
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

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
        isAdmin,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
        userRole: 'user', // Update based on user data or logic
        setUserRole: (role: UserRole) => {
          setIsAdmin(role === 'admin')
          localStorage.setItem('userRole', role) // Update local storage (optional)
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
