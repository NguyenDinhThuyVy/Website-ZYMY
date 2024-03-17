import { useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

interface Role {
  role1: number
  role2: number
}

function Accounts() {
  const queryConfig = useQueryConfig()
  const [role, setRole] = useState<Role | undefined>() // Initialize role state with the Role type

  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    },
    onSuccess: (data) => {
      const roleCounts: Role = {
        role1: 0,
        role2: 0
      }

      data.data.data.forEach((item: { roles: string[] }) => {
        if (item.roles.includes('Admin')) {
          roleCounts.role1++
        } else if (item.roles.includes('User')) {
          roleCounts.role2++
        }
      })

      setRole(roleCounts)
    }
  })
  cl
  return (
    <div className='flex gap-20 mt-20 ml-10'>
      <div className=''>
        <FormAccount></FormAccount>
      </div>
      <div className=''>{/* <MyDoughnutChart role={role}></MyDoughnutChart> */}</div>
    </div>
  )
}

export default Accounts
