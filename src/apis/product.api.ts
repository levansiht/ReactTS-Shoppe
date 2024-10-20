import { ProductList, ProductListConfig } from '../types/product.type'
import http from '../utils/http'
import { SuccessResponse } from '../types/utils.type'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<ProductList>>(`${URL}/${id}`)
  }
}

export default productApi
