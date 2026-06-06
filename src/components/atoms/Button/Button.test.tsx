import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import style from './Button.module.css'

describe('Button test suite', () => {
  it('should render its label', () => {
    render(
      <Button
        variant="neutral"
        aria-label="Save recipe">
        Save
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Save recipe' })).toHaveTextContent('Save')
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button
        variant="purple"
        onClick={onClick}
        aria-label="Like recipe">
        Like
      </Button>
    )

    await user.click(screen.getByRole('button', { name: 'Like recipe' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when the disabled prop is set', () => {
    render(
      <Button
        variant="neutral"
        disabled
        aria-label="Disabled action">
        Disabled
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Disabled action' })).toBeDisabled()
  })

  describe('variants', () => {
    it.each([
      ['neutral', style.neutral],
      ['purple', style.purple]
    ] as const)('should apply the %s variant class', (variant, expectedClass) => {
      render(
        <Button
          variant={variant}
          aria-label={`${variant} button`}>
          Label
        </Button>
      )

      expect(screen.getByRole('button', { name: `${variant} button` })).toHaveClass(expectedClass)
    })
  })
})
