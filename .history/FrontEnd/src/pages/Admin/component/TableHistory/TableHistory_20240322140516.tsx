
Lỗi "React Hook 'useUserQuery' cannot be called inside a callback" xảy ra vì useUserQuery được gọi bên trong một hàm map, không phải trong một React function component hoặc một custom React Hook function. Để khắc phục lỗi này, bạn cần đảm bảo rằng useUserQuery được gọi trong một phạm vi hợp lệ.

Trong trường hợp này, bạn đã định nghĩa useUserQuery như một hàm tùy chỉnh, nhưng vẫn cần gọi nó từ một component React. Dưới đây là cách sửa lỗi:

typescript
Copy code
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import adminApi from 'src/apis/admin.api';
import useQueryConfig from 'src/hooks/useQueryConfig';
import { Order } from 'src/types/order.type';

// Định nghĩa useUserQuery như một hook tùy chỉnh
export function useUserQuery(userId: string): UseQueryResult<any> {
  return useQuery({
    queryKey: ['userData', userId],
    queryFn: () => adminApi.getUser(userId),
  });
}

// Sử dụng hook tùy chỉnh trong component React
function TableHistory() {
  const queryConfig = useQueryConfig();
  const { data: orderData } = useQuery({
    queryKey: ['orders', queryConfig],
    queryFn: () => adminApi.getAllOrder(),
  });

  const [userDataQueries, setUserDataQueries] = useState<UseQueryResult<any>[]>([]);

  useEffect(() => {
    if (orderData && orderData.data && orderData.data.data) {
      const dataIndex: any[] = orderData.data.data.user;
      const queries = dataIndex.map((userId) => {
        return useUserQuery(userId); // Gọi useUserQuery trong component React
      });
      setUserDataQueries(queries);
      // Refetch user data whenever the component re-renders
      queries.forEach((query) => {
        query.refetch();
      });
    }
  }, [orderData]);

  // Khai báo columns cho bảng
  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Mã Người Mua',
      dataIndex: 'user',
      key: 'user',
      render: (userId: string) => {
        // Find user data for the current userId
        const userDataQuery = userDataQueries.find((query) => query.data?.data._id === userId)
        // Return user name or placeholder if user data is not available yet
        return userDataQuery ? userDataQuery.data?.data.name : 'Loading...'
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'buy_count',
      key: 'buy_count'
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['shippingAddress', 'city'],
      key: 'shippingAddress.city'
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'shippingAddress.phone'
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      width: 5
    }
  ]

  // Lấy dữ liệu đơn hàng từ orderData
  const order: any = orderData?.data.data

  // Render Table với dữ liệu đơn hàng và columns đã được khai báo
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['6', '8', '12'],
          defaultPageSize: 6
        }}
        columns={columns}
        dataSource={order}
      />
    </>
  )
}

export default TableHistory
