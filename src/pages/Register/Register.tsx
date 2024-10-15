import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)
  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng kí</div>
              <Input
                type='email'
                className='mt-8'
                placeholder='Email'
                autoComplete='email'
                errorsMessage={errors.email?.message}
                register={register}
                name='email'
                rules={rules.email}
              />
              <Input
                type='password'
                className='mt-2'
                placeholder='Password'
                autoComplete='on'
                errorsMessage={errors.password?.message}
                register={register}
                name='password'
                rules={rules.password}
              />
              <Input
                type='password'
                className='mt-2'
                placeholder='Confirm Password'
                autoComplete='on'
                errorsMessage={errors.confirm_password?.message}
                register={register}
                name='confirm_password'
                rules={rules.confirm_password}
              />
              <div className='mt-2'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng kí
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-red-500 ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
