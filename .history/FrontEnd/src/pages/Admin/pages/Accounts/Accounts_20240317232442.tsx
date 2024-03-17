import { useEffect, useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
// import FormAccountEdit from '../../component/FormAccountEdit'

interface Role {
  role1: number
  role2: number
}

export default function Accounts() {
  const queryConfig = useQueryConfig()
  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })

  const [role, setRole] = useState<Role>({
    role1: 0,
    role2: 0
  }) // Initialize role state with the Role type

  const handleGetAllAccount = async () => {
    const roleCounts: Role = {
      role1: 0,
      role2: 0
    }
    if (usersData)
      usersData.data.data.forEach((item: { roles: string[] }) => {
        if (item.roles.includes('Admin')) {
          roleCounts.role1++
        } else if (item.roles.includes('User')) {
          roleCounts.role2++
        }
      })

    setRole(roleCounts)
  }

  useEffect(() => {
    handleGetAllAccount()
  }, [usersData])

  return (
    <div className='mt-20 ml-10 flex flex-col'>
      <div className='flex gap-20 '>
        <div className=''>
          <FormAccount></FormAccount>
        </div>
        <MyDoughnutChart role={role}></MyDoughnutChart>
      </div>
    </div>
  )
}
