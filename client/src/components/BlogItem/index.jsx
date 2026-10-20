import React from 'react'
import { IoIosArrowForward, IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'

const BlogItem = () => {
  return (
    <div className='blogItem group'> 
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img src="asset/sub-banner-4.jpg" alt="blog image" className='w-full transition-all group-hover:scale-105 group-hover:rotate-1'/>
      <span className='flex items-center justify-center text-white absolute bottom-[15px] gap-3 right-[15px] z-50 bg-primary font-[500] rounded-md text-[11px] p-1'>
        <IoMdTime className='text-[16px]'/> 5 August 2025
      </span>
      </div>
      <div className="info py-4"> 
<h2 className='text-[16px] font-[600] text-black'>
    <Link to="/" className='link'>nullam ullamcorper ornare</Link>
</h2>
<p className='text-[13px] font-[500] text-[rgba(0,0,0,0.8)] mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Ex vel ullam voluptatibus repudiandae ratione perspiciatis...  </p>
    <Link to="/" className='link font-[500] text-[14px] flex items-center gap-1'>
    Read More <IoIosArrowForward/>
    </Link>
      </div>
    </div>
  )
}

export default BlogItem
