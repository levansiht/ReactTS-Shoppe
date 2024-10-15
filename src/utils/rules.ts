import { type RegisterOptions } from 'react-hook-form'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Email không hợp lệ'
    },
    minLength: {
      value: 5,
      message: 'Email phải có ít nhất 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email không được quá 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    minLength: {
      value: 5,
      message: 'Password phải có ít nhất 6 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Password không được quá 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhâp lại password là bắt buộc'
    },
    minLength: {
      value: 5,
      message: 'Độ dài password phải lớn hơn 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài password phải nhỏ hơn 60 ký tự'
    }
  }
}
