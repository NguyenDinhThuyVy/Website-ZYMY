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
      role3: 0,
    };
    usersData.data.data.forEach((item) => {
      if (item.roles === 'Admin') {
        roleCounts.role1++;
      } else if (item.roleID === '3') {
        roleCounts.role3++;
      }
    });
    setRole(roleCounts);
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
