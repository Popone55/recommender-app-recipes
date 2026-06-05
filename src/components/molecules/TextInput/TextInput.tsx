import { Typography } from '@components/atoms/Typography/Typography'
import clsx from 'clsx'
import type { RefObject } from 'react'
import { useRef, type ChangeEvent, type FC, type KeyboardEvent, type ReactNode } from 'react'
import style from './TextInput.module.css'

interface TextInputProps {
  placeholder?: string
  label?: ReactNode
  value: string | null | undefined
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onEnter?: (value: string) => void
  disabled?: boolean
  inputClassName?: string
  inputWrapperClassName?: string
  fieldsetClassName?: string
  ref?: RefObject<HTMLFieldSetElement | null>
}

export const TextInput: FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onEnter,
  disabled,
  inputClassName,
  inputWrapperClassName,
  fieldsetClassName,
  ref
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    onChange?.(val)
  }

  const definedValue = value ?? ''

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!onEnter) return
    if (event.key === 'Enter') {
      event.preventDefault()
      onEnter(definedValue)
    }
  }

  return (
    <fieldset
      ref={ref}
      className={clsx(
        style.root,
        {
          [style.disabled]: disabled
        },
        fieldsetClassName
      )}>
      <label>
        {!!label && (
          <Typography
            size="2xs"
            weight="medium">
            {label}
          </Typography>
        )}
        <div className={clsx(style.inputWrapper, inputWrapperClassName)}>
          <input
            ref={inputRef}
            className={inputClassName}
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            value={definedValue}
            onChange={onValueChange}
            onBlur={() => onBlur?.(definedValue)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </label>
    </fieldset>
  )
}
