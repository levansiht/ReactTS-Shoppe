import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='data:image/jpeg;base64,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'
            alt=''
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            [BRAND GOODS] High-Quality Automatic Buckle Men's Leather Belt Genuine Korean Style Rotating Belt v77men
          </div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span>5.000</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>2.000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3  h-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
