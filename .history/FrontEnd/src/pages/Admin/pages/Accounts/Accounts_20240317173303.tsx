import { useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'

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
