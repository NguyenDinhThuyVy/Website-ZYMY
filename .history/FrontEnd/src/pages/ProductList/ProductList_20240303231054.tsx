import { Link } from 'react-router-dom'
import ItemCategory from 'src/components/ItemCategory'
import ItemTop from 'src/components/ItemTop'
import Banner from 'src/components/Swiper'

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
      <div className='bg-slate-50  my-10 mx-32'>
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
      <div className='flex flex-row gap-5 bg-slate-50 items-center justify-center my-10 mx-32 h-72'>
        <div className='flex h-72 w-full items-start bg-slate-50'>
          <ItemTop></ItemTop>
        </div>
      </div>
    </div>
  )
}
