import { Typography } from '@components/atoms/Typography/Typography'
import clsx from 'clsx'
import type { FC, InputHTMLAttributes, KeyboardEvent, ReactNode, RefObject } from 'react'
import style from './TextInput.module.css'

interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'onBlur'
> {
  label?: ReactNode
  value: string | null | undefined
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onEnter?: (value: string) => void
  inputClassName?: string
  inputWrapperClassName?: string
  fieldsetClassName?: string
  ref?: RefObject<HTMLFieldSetElement | null>
  inputRef?: RefObject<HTMLInputElement | null>
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
  ref: fieldsetRef,
  inputRef,
  ...inputProps
}) => {
  const definedValue = value ?? ''

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    inputProps.onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (!onEnter) return
    if (event.key === 'Enter') {
      event.preventDefault()
      onEnter(definedValue)
    }
  }

  return (
    <fieldset
      ref={fieldsetRef}
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
            {...inputProps}
            ref={inputRef}
            className={inputClassName}
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            value={definedValue}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={() => onBlur?.(definedValue)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </label>
    </fieldset>
  )
}
