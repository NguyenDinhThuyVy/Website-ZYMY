import { useEffect, useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import TableHistory from '../../component/TableHistory'

interface Role {
  role1: number
  role2: number
}

export default function Orders() {
  const queryConfig = useQueryConfig()
  const { data: ordersData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => {
      return adminApi.getAllOrder()
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
      usersData.data.data.forEach((item: { status: number }) => {
        if (item.status.includes(1)) {
          roleCounts.role1++
        } else if (item.status.includes(2)) {
          roleCounts.role2++
        }
      })

    setRole(roleCounts)
  }

  useEffect(() => {
    handleGetAllAccount()
  }, [usersData])

  return (
    <div className='flex gap-20 mt-20 ml-10'>
      <div className=''>
        <TableHistory></TableHistory>
      </div>
      <MyDoughnutChart role={role}></MyDoughnutChart>
    </div>
  )
}
