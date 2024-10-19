export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResonse<Data> {
  message: string
  data: Data
}
