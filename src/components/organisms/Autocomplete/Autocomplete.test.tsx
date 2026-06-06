import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Autocomplete, type AutocompleteQueryResult } from './Autocomplete'

type TestOption = { id: string; label: string }

const testOptions: TestOption[] = [
  { id: '1', label: 'Italian' },
  { id: '2', label: 'Mexican' },
  { id: '3', label: 'Japanese' }
]

const defaultQuery: AutocompleteQueryResult<TestOption[]> = {
  data: testOptions,
  isLoading: false,
  error: null
}

interface AutocompleteHarnessProps {
  initialValue?: string
  onChange?: (value: string) => void
  onSelect?: (option: TestOption) => void
  query?: AutocompleteQueryResult<TestOption[]>
  disabled?: boolean
}

const AutocompleteHarness = ({
  initialValue = '',
  onChange,
  onSelect,
  query = defaultQuery,
  disabled
}: AutocompleteHarnessProps) => {
  const [value, setValue] = useState(initialValue)

  return (
    <Autocomplete<TestOption[], TestOption>
      label="Area"
      placeholder="Search areas"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
        onChange?.(nextValue)
      }}
      onSelect={onSelect}
      disabled={disabled}
      query={query}
      getOptions={(data) => data}
      getOptionLabel={(option) => option.label}
    />
  )
}

describe('Autocomplete test suite', () => {
  it('should render the combobox with label and placeholder', () => {
    render(<AutocompleteHarness />)

    expect(screen.getByText('Area')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('placeholder', 'Search areas')
  })

  it('should show options when the input is focused', async () => {
    const user = userEvent.setup()

    render(<AutocompleteHarness />)

    await user.click(screen.getByRole('combobox'))

    expect(screen.getByRole('option', { name: 'Italian' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Mexican' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Japanese' })).toBeInTheDocument()
  })

  it('should filter options as the user types', async () => {
    const user = userEvent.setup()

    render(<AutocompleteHarness />)

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'ita')

    expect(screen.getByRole('option', { name: 'Italian' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Mexican' })).not.toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Japanese' })).not.toBeInTheDocument()
  })

  it('should call onSelect and update the value when an option is selected', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onChange = vi.fn()

    render(
      <AutocompleteHarness
        onSelect={onSelect}
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Mexican' }))

    expect(onSelect).toHaveBeenCalledWith({ id: '2', label: 'Mexican' })
    expect(onChange).toHaveBeenCalledWith('Mexican')
    expect(screen.getByRole('combobox')).toHaveValue('Mexican')
  })

  it('should show a loading message while fetching options', async () => {
    const user = userEvent.setup()

    render(<AutocompleteHarness query={{ data: undefined, isLoading: true, error: null }} />)

    await user.click(screen.getByRole('combobox'))

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should show an error message when the query fails', async () => {
    const user = userEvent.setup()

    render(
      <AutocompleteHarness
        query={{ data: testOptions, isLoading: false, error: new Error('Request failed') }}
      />
    )

    await user.click(screen.getByRole('combobox'))

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should show a no results message when the filter matches nothing', async () => {
    const user = userEvent.setup()

    render(<AutocompleteHarness />)

    const input = screen.getByRole('combobox')
    await user.click(input)
    await user.type(input, 'xyz')

    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('should clear the value when the clear button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <AutocompleteHarness
        initialValue="Italian"
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(onChange).toHaveBeenCalledWith('')
    expect(screen.getByRole('combobox')).toHaveValue('')
  })
})
