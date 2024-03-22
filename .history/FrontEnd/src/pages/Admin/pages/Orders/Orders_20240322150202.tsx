import { useEffect, useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import TableHistory from '../../component/TableHistory'
import ChartHistory from '../../component/ChartHistory'

interface Role {
  role1: number
  role2: number
  role3: number
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
    role2: 0,
    role3: 0
  }) // Initialize role state with the Role type

  const handleGetAllAccount = async () => {
    const roleCounts: Role = {
      role1: 0,
      role2: 0
    }
    if (ordersData)
      ordersData.data.data.forEach((item: { status: number }) => {
        if (item.status === 1) {
          roleCounts.role1++
        } else if (item.status === 3) {
          roleCounts.role2++
        }
      })

    setRole(roleCounts)
  }

  useEffect(() => {
    handleGetAllAccount()
  }, [ordersData])

  return (
    <div className='flex gap-20 mt-20 ml-10'>
      <div className=''>
        <TableHistory></TableHistory>
      </div>
      <ChartHistory role={role}></ChartHistory>
    </div>
  )
}
