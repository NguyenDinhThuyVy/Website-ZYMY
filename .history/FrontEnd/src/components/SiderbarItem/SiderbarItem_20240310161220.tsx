import React from 'react'
import { data } from './data'
import NavItem from './NavItem/NavItem'

const NavBar: React.FC = () => {
  return (
    <nav className='col-span-2 border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between'>
      <div className='space-y-8 w-full '>
        {data.slice(0, 4).map((data) => (
          <NavItem link={data.link} key={data.id} />
        ))}
      </div>
      <div className='xl:flex flex-col hidden  items-center justify-center space-y-4 px-4 py-4 '>
        <h1 className='text-xl w-full font-medium'>
          Grow Your <br /> Saving Now!
        </h1>
        <p> Pick an investment strategy that reflects your goals </p>
        <button className=' w-full py-2 px-3 bg-black text-white'>Become a Pro</button>
      </div>
    </nav>
  )
}

export default NavBar
