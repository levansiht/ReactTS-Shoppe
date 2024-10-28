type Role = 'Admin' | 'User'

export interface User {
  id: string
  role: Role[]
  email: string
  name?: string
  date_of_birth?: string
  avatar?: string
  address?: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}
