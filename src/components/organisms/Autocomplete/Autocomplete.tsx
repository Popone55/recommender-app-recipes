import { TextInput } from '@components/molecules/TextInput/TextInput'
import { AutocompleteDropdown } from '@components/organisms/Autocomplete/AutocompleteDropdown'
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole
} from '@floating-ui/react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode
} from 'react'
import style from './Autocomplete.module.css'

export interface AutocompleteQueryResult<TData> {
  data: TData | undefined
  isLoading: boolean
  error: unknown
}

interface AutocompleteProps<TData, TOption> {
  label?: ReactNode
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSelect?: (option: TOption) => void
  disabled?: boolean
  query: AutocompleteQueryResult<TData>
  getOptions: (data: TData) => TOption[]
  getOptionLabel: (option: TOption) => string
  noResultsText?: string
  loadingText?: string
  errorText?: string
  className?: string
}

export const Autocomplete = <TData, TOption>({
  label,
  placeholder,
  value,
  onChange,
  onSelect,
  disabled,
  query,
  getOptions,
  getOptionLabel,
  noResultsText = 'No results found',
  loadingText = 'Loading...',
  errorText = 'Something went wrong',
  className
}: AutocompleteProps<TData, TOption>) => {
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<Array<HTMLElement | null>>([])

  const handleOpenChange = useCallback((shouldOpen: boolean) => {
    if (!shouldOpen) setActiveIndex(null)
    setOpen(shouldOpen)
  }, [])

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`
          })
        },
        padding: 8
      })
    ]
  })

  const options = useMemo(() => {
    if (!query.data) return []
    return getOptions(query.data)
  }, [getOptions, query.data])

  const filteredOptions = useMemo(() => {
    const normalizedValue = value.trim().toLowerCase()

    return options.filter((option) => {
      if (!normalizedValue) return true
      return getOptionLabel(option).toLowerCase().includes(normalizedValue)
    })
  }, [getOptionLabel, options, value])

  const click = useClick(context, { enabled: !disabled })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'listbox' })
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: true,
    enabled: open && filteredOptions.length > 0
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation
  ])

  const showDropdown = open && !disabled
  const activeOptionId = activeIndex === null ? undefined : `${listboxId}-option-${activeIndex}`

  const referenceProps = getReferenceProps({
    onFocus: () => setOpen(true)
  }) as {
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void
    onPointerDown?: (event: PointerEvent<HTMLInputElement>) => void
  }

  const handleSelect = useCallback(
    (option: TOption) => {
      onChange(getOptionLabel(option))
      onSelect?.(option)
      handleOpenChange(false)
    },
    [getOptionLabel, handleOpenChange, onChange, onSelect]
  )

  const handleClear = useCallback(() => {
    onChange('')
    setActiveIndex(null)
    setOpen(true)
  }, [onChange])

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      referenceProps.onKeyDown?.(event)
      if (event.defaultPrevented) return

      if (event.key === 'Enter' && activeIndex !== null) {
        const option = filteredOptions[activeIndex]
        if (option) {
          event.preventDefault()
          handleSelect(option)
        }
      }
    },
    [activeIndex, filteredOptions, handleSelect, referenceProps]
  )

  return (
    <div
      ref={refs.setReference}
      className={clsx(style.root, className)}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        onChange={(nextValue) => {
          onChange(nextValue)
          setOpen(true)
          setActiveIndex(null)
        }}
        onKeyDown={handleInputKeyDown}
        onFocus={referenceProps.onFocus}
        onPointerDown={referenceProps.onPointerDown}
        suffix={
          value.length > 0 &&
          !disabled && (
            <button
              type="button"
              className={style.clearButton}
              aria-label="Clear search"
              onPointerDown={(event) => event.preventDefault()}
              onClick={handleClear}>
              <X size={16} />
            </button>
          )
        }
      />

      {showDropdown && (
        <FloatingPortal>
          <div
            {...getFloatingProps({
              id: listboxId,
              ref: refs.setFloating,
              style: floatingStyles
            })}
            className={style.dropdown}>
            <AutocompleteDropdown
              isLoading={query.isLoading}
              error={query.error}
              options={filteredOptions}
              listboxId={listboxId}
              activeIndex={activeIndex}
              listRef={listRef}
              getOptionLabel={getOptionLabel}
              getItemProps={getItemProps}
              onSelect={handleSelect}
              noResultsText={noResultsText}
              loadingText={loadingText}
              errorText={errorText}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  )
}
