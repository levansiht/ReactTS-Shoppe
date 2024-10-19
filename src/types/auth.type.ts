import { User } from './user.type'
import { SuccessResonse } from './utils.type'

export type AuthResponse = SuccessResonse<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>
