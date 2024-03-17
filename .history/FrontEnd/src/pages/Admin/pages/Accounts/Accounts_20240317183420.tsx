import { useEffect, useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import FormAccount from '../../component/FormAccount'
import { useMutation, useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

interface Role {
  role1: number
  role2: number
}

export default function Accounts() {
  const queryConfig = useQueryConfig()
  const { data: usersData, refetch } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })
  // const deleteUserMutation = useMutation({
  //   mutationFn: adminApi.deleteUser,
  //   onSuccess: () => {
  //     refetch()
  //   }
  // })
  // const handleDelete = () => () => {
  //   if (usersData) {
  //     usersData.data.data.map((item) => {
  //       const UserId = item._id
  //       deleteUserMutation.mutate([UserId])
  //     })
  //   }
  // }
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
    <div className='flex gap-20 mt-20 ml-10'>
      <div className=''>
        <FormAccount></FormAccount>
      </div>
      <MyDoughnutChart role={role}></MyDoughnutChart>
    </div>
  )
}
