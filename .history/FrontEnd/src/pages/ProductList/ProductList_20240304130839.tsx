import { Link } from 'react-router-dom'
import ItemCategory from 'src/components/ItemCategory'
import ItemTop from 'src/components/ItemTop'
import Banner from 'src/components/Swiper'
import { FaFireAlt } from 'react-icons/fa'
import { BsChevronRight } from 'react-icons/bs'
import SortProductList from './SortProductList'
import AsideFilter from './AsideFilter'
import Product from './Product'

export default function ProductList() {
  return (
    <div className='bg-[#f5f5f5ff] h-full flex flex-col '>
      <div className='bg-slate-50 min-h-32'>
        <div className='flex flex-row gap-5 bg-slate-50 items-center justify-center my-10 mx-32'>
          <div className='flex h-50 w-2/3 items-start bg-slate-50 '>
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
      <div className='bg-slate-50 my-10 mx-32'>
        <div className='text-gray-400 uppercase pt-7 px-5 '>Danh mục</div>
        <div className=' grid grid-cols-8 py-5 '>
          <ItemCategory img='aonam.png' name='Thời Trang Nam'></ItemCategory>
          <ItemCategory img='dienthoai.png' name='Điện Thoại'></ItemCategory>
          <ItemCategory img='dientu.png' name='Thiết Bị Điện Tử'></ItemCategory>
          <ItemCategory img='latop.png' name='Laptop'></ItemCategory>
          <ItemCategory img='aonu.png' name='Thời Trang Nữ'></ItemCategory>
          <ItemCategory img='giay.png' name='Giày Dép Nữ'></ItemCategory>
          <ItemCategory img='tuixach.png' name='Túi Xách Nữ'></ItemCategory>
          <ItemCategory img='sach.png' name='Sách'></ItemCategory>
        </div>
      </div>
      <div className='flex items-center  justify-center  mx-32'>
        <div>
          <Link to='/'>
            <img src='quancao.jpg' alt='' className='rounded-md cursor-pointer' />
          </Link>
        </div>
      </div>
      <div className='min-h-80 bg-slate-50 my-10 mx-32 '>
        <div className='py-4 px-5 flex justify-between border-b-2 border-gray-100'>
          <div className=' text-orange-600 flex flex-row gap-1 '>
            <div className='text-red-400 uppercase text-lg '>Tìm kiếm hàng đầu</div>
            <FaFireAlt className='text-2xl' />
          </div>
          <div className='flex flex-row gap-1 text-gray-400 items-center hover:text-gray-300 '>
            <Link to='/'>Xem thêm</Link>
            <BsChevronRight />
          </div>
        </div>
        <div className='flex flex-row gap-5 items-center justify-center px-1 mt-4 min-h-80 '>
          <div className='flex h-64 w-full items-start'>
            <ItemTop></ItemTop>
          </div>
        </div>
      </div>
      <div className='flex bg-slate-50  mx-32 p-5 uppercase text-rose-500 font-bold border-b-4 items-center justify-center'>
        Gợi Ý Hôm Nay
      </div>
      <div className='bg-slate-50 my-2 mx-32 py-7'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {Array(30)
                  .fill(0)
                  .map((_, index) => (
                    <div className='col-span-1' key={index}>
                      <Product />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
