import React, { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorsMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({
    errorsMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  }) => {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      if (/^\d+$/.test(value) || value === '') {
        onChange && onChange(e)

        setLocalValue(value)
      }
    }

    return (
      <div className={className}>
        <input className={classNameInput} {...rest} onChange={handleOnChange} value={value || localValue} />
        {errorsMessage && <div className={classNameError}>{errorsMessage}</div>}
      </div>
    )
  }
)
export default InputNumber
