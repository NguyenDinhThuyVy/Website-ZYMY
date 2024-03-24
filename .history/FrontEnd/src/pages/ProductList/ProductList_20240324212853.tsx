import { Link, createSearchParams } from 'react-router-dom'
import ItemCategory from 'src/components/ItemCategory'

import Banner from 'src/components/Swiper'
import { FaFireAlt } from 'react-icons/fa'
import { BsChevronRight } from 'react-icons/bs'
import SortProductList from './SortProductList'
import AsideFilter from './AsideFilter'
import Product from './Product'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

import Pagination from 'src/components/Pagination'
import categoryApi from 'src/apis/category.api'
import path from 'src/constants/path'
import { ProductListConfig } from 'src/types/product.type'
import ItemTop from './ItemTop'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { t } = useTranslation(['home'])
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-neutral-100 h-full flex flex-col '>
      <div className='bg-white min-h-32'>
        <div className='flex flex-row gap-5 bg-white items-center justify-center my-10 mx-32'>
          <div className='flex h-50 w-2/3 items-start bg-white '>
            <Banner></Banner>
          </div>
          <div className='flex flex-col h-full w-1/3 gap-2 '>
            <div className='h-1/2 rounded-md'>
              <img src='6.jpg' alt='' className='rounded-md' />
            </div>
            <div className='h-1/2 rounded-md'>
              <img src='8.png' alt='' className='rounded-md' />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white  my-10 mx-32'>
        <div className='text-gray-400 uppercase pt-7 px-5 '>Danh mục</div>
        <div className=' grid grid-cols-8 py-5 '>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '60aba4e24efcc70f8892e1c6'
              }).toString()
            }}
          >
            <ItemCategory img='aonam.png' name='Thời Trang Nam'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '60afafe76ef5b902180aacb5'
              }).toString()
            }}
          >
            <ItemCategory img='dienthoai.png' name='Điện Thoại'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '60afacca6ef5b902180aacaf'
              }).toString()
            }}
          >
            <ItemCategory img='dongho.png' name='Đồng hồ'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '65ef3b5a04766a6306cc63b3'
              }).toString()
            }}
          >
            <ItemCategory img='latop.png' name='Laptop'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '65ef3b9c04766a6306cc63b6'
              }).toString()
            }}
          >
            <ItemCategory img='aonu.png' name='Thời Trang Nữ'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '65ef3bb004766a6306cc63b7'
              }).toString()
            }}
          >
            <ItemCategory img='son.png' name='Son'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '65ef3bb004766a6306cc63b8'
              }).toString()
            }}
          >
            <ItemCategory img='giay.png' name='Giày Dép Nữ'></ItemCategory>
          </Link>
          <Link
            to={{
              pathname: path.productCategory,
              search: createSearchParams({
                ...queryConfig,
                category: '65ef3bb004766a6306cc63b9'
              }).toString()
            }}
          >
            <ItemCategory img='tuixach.png' name='Túi Xách Nữ'></ItemCategory>
          </Link>
        </div>
      </div>
      <div className='flex items-center  justify-center  mx-32'>
        <div>
          <Link to='/'>
            <img src='quancao.jpg' alt='' className='rounded-md cursor-pointer' />
          </Link>
        </div>
      </div>
      <div className='min-h-80 bg-white  my-10 mx-32 '>
        <div className='py-4 px-5 flex justify-between border-b-2 border-gray-100'>
          <div className=' text-orange-600 flex flex-row gap-1 '>
            <div className='text-red-400 uppercase text-lg '>Tìm kiếm hàng đầu</div>
            <FaFireAlt className='text-2xl' />
          </div>
          <div className='flex flex-row gap-1 text-gray-400 items-center hover:text-gray-300 '>
            <Link
              to={{
                pathname: path.productCategory,
                search: createSearchParams({
                  ...queryConfig
                }).toString()
              }}
            >
              Xem thêm
            </Link>
            <BsChevronRight />
          </div>
        </div>
        {productsData && (
          <div className='flex flex-row gap-5 items-center justify-center px-1 mt-1 min-h-96 '>
            <div className='flex h-80 w-full items-start'>
              <ItemTop data={productsData.data.data.products}></ItemTop>
            </div>
          </div>
        )}
      </div>
      <div className='flex bg-white   mx-32 p-5 uppercase text-rose-500 font-bold border-b-4 border-rose-400 items-center justify-center'>
        Gợi Ý Hôm Nay
      </div>
      <div className='bg-white  my-2 mx-32 py-7 mb-10'>
        <div className='container'>
          {productsData && (
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-3'>
                <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
              </div>
              <div className='col-span-9'>
                <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination
                  queryConfig={queryConfig}
                  pageSize={productsData.data.data.pagination.page_size}
                  namePath='home'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
