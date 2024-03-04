import React from 'react'

function ItemCategory() {
  return (
    <div className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 hover:scale-110'>
      <button>
        <img src='aonam.png' alt='' />
        <div>
          <span>Thời Trang Như</span>
        </div>
      </button>
    </div>
  )
}

export default ItemCategory
