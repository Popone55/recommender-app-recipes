import { LoadingSpinner } from '@components/atoms/LoadingSpinner/LoadingSpinner'
import { Typography } from '@components/atoms/Typography/Typography'
import type { useInteractions } from '@floating-ui/react'
import clsx from 'clsx'
import type { RefObject } from 'react'
import style from './Autocomplete.module.css'

type GetItemProps = ReturnType<typeof useInteractions>['getItemProps']

interface AutocompleteDropdownProps<TOption> {
  isLoading: boolean
  error: unknown
  options: TOption[]
  listboxId: string
  activeIndex: number | null
  listRef: RefObject<Array<HTMLElement | null>>
  getOptionLabel: (option: TOption) => string
  getItemProps: GetItemProps
  onSelect: (option: TOption) => void
  noResultsText: string
  loadingText: string
  errorText: string
}

export const AutocompleteDropdown = <TOption,>({
  isLoading,
  error,
  options,
  listboxId,
  activeIndex,
  listRef,
  getOptionLabel,
  getItemProps,
  onSelect,
  noResultsText,
  loadingText,
  errorText
}: AutocompleteDropdownProps<TOption>) => {
  if (isLoading) {
    return (
      <div className={style.status}>
        <LoadingSpinner size="xsmall" />
        <Typography size="xs">{loadingText}</Typography>
      </div>
    )
  }

  if (error) {
    return (
      <div className={clsx(style.status, style.statusError)}>
        <Typography size="xs">{errorText}</Typography>
      </div>
    )
  }

  if (options.length === 0) {
    return (
      <div className={style.status}>
        <Typography size="xs">{noResultsText}</Typography>
      </div>
    )
  }

  return (
    <ul className={style.list}>
      {options.map((option, index) => (
        <li
          key={`${getOptionLabel(option)}-${index}`}
          ref={(node) => {
            listRef.current[index] = node
          }}
          role="option"
          id={`${listboxId}-option-${index}`}
          aria-selected={activeIndex === index}
          data-active={activeIndex === index}
          className={style.option}
          {...getItemProps({
            onClick: () => {
              onSelect(option)
            }
          })}>
          {getOptionLabel(option)}
        </li>
      ))}
    </ul>
  )
}
