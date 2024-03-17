import { User } from 'src/types/user.type'

type Role = 'User' | 'Admin'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export async function checkAdminPrivileges(): Promise<boolean> {
  try {
    const profile: User | null = getProfileFromLS()

    // Check for single admin role in string property
  if (profile && (profile.roles.Roles[] === 'admin' || profile.roles?.includes('admin'))) {
      return true
    }

    return false
  } catch (error) {
    console.error('Error checking admin privileges:', error)
    return false
  }
}
