import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase.api'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })
  const [buyCount, setBuyCount] = useState(1)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productDetailData?.data.data

  const queryConfig: ProductListConfig = { limit: 20, page: '1', category: product?.category.id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: Infinity
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const nextImage = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prevImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleChooseActiveImage = (img: string) => {
    setActiveImage(img)
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const handleZoomImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'

    // evemt bubble
  }

  const handleMouseLeave = () => {
    imgRef.current?.removeAttribute('style')
  }
  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?.id as string, buy_count: buyCount },
      {
        onSuccess: () => {
          toast.success('Thêm vào giỏ hàng thành công', { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='mt-8'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='grid grid-cols-12 gap-9'>
              <div className='col-span-5'>
                <div
                  className='relative w-full pt-[100%] overflow-hidden shadow cursor-zoom-in'
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={activeImage}
                    alt={product.name}
                    className='absolute top-0 left-0 bg-white w-full h-full object-cover pointer-events-none'
                    ref={imgRef}
                  />
                </div>
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={prevImage}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImages.slice(0, 5).map((image) => {
                    const isActive = image === activeImage
                    return (
                      <div
                        className='relative w-full pt-[100%]'
                        key={image}
                        onMouseEnter={() => handleChooseActiveImage(image)}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          className='absolute top-0 left-0 bg-white w-full h-full object-cover cursor-pointer'
                        />

                        {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                      </div>
                    )
                  })}
                  <button
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={nextImage}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='col-span-7'>
                <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                <div className='mt-8 flex items-center'>
                  <div className='flex items-center'>
                    <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                    <ProductRating
                      rating={product.rating}
                      activeClassname='fill-orange text-orange h-4 w-4'
                      nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                    />
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <div>
                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='ml-1 text-gray-500'> Đã bán</span>
                  </div>
                </div>
                <div className='mt-8 flex items-center px-5 py-4'>
                  <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                  <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                    {rateSale(product.price_before_discount, product.price)} giảm
                  </div>
                </div>
                <div className='mt-8 flex items-center'>
                  <div className='capitalize text-gray-500'>Số lượng</div>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity}
                  />
                  <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
                </div>
                <div className='mt-8 flex items-center'>
                  <button
                    onClick={addToCart}
                    className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='mr-[10px] size-5 fill-current stroke-orange text-orange'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                      />
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  <button className='hover:bg-orange/90 ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none'>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'> mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
          {productData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productData.data.data.products.map((product) => (
                <div className='col-span-1' key={product.id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
