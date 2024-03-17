import { useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

function Accounts() {
  const queryConfig = useQueryConfig()
  const [role, setRole] = useState({
    role1: 0,
    role2: 0
  })
  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  if (usersData) {
    let roleCounts = {
      role1: 0,
      role3: 0
    }
    usersData.data.data.forEach((item) => {
      if (item.roles.includes('Admin')) {
        roleCounts.role1++
      } else if (item.roles.includes('User')) {
        roleCounts.role3++
      }
    })
  }
  return (
    <div className='flex  gap-20 mt-20 ml-10'>
      <div className=''>
        <FormAccount></FormAccount>
      </div>
      <div className=''>
        <MyDoughnutChart></MyDoughnutChart>
      </div>
    </div>
  )
}

export default Accounts
