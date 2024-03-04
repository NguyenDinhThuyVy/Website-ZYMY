import React from 'react'

interface Props {
  img?: string
  name?: string
}
function ItemCategory({ img, name }: Props) {
  return (
    <div className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
      <button>
        <img src={img} alt='' />
        <div>
          <span>{name}</span>
        </div>
      </button>
    </div>
  )
}

export default ItemCategory
