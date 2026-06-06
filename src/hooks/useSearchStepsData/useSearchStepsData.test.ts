import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useSearchStepsData } from './useSearchStepsData'

describe('useSearchStepsData test suite', () => {
  it('should start with empty search steps', () => {
    const { result } = renderHook(() => useSearchStepsData())

    expect(result.current.areaOfInterest).toBeNull()
    expect(result.current.category).toBeNull()
    expect(result.current.areaOfInterestValue).toBeNull()
    expect(result.current.categoryValue).toBeNull()
    expect(result.current.canContinueToAdvancedPreferences).toBe(false)
    expect(result.current.canContinueToResults).toBe(false)
  })

  it('should allow continuing to advanced preferences when area is selected', () => {
    const { result } = renderHook(() => useSearchStepsData())

    act(() => {
      result.current.setAreaOfInterest('Italian')
    })

    expect(result.current.areaOfInterest).toBe('Italian')
    expect(result.current.canContinueToAdvancedPreferences).toBe(true)
    expect(result.current.canContinueToResults).toBe(false)
  })

  it('should allow continuing to results when area and category are selected', () => {
    const { result } = renderHook(() => useSearchStepsData())

    act(() => {
      result.current.setAreaOfInterest('Italian')
      result.current.setCategory('Seafood')
    })

    expect(result.current.canContinueToAdvancedPreferences).toBe(true)
    expect(result.current.canContinueToResults).toBe(true)
  })

  it('should not allow continuing to results when only category is selected', () => {
    const { result } = renderHook(() => useSearchStepsData())

    act(() => {
      result.current.setCategory('Seafood')
    })

    expect(result.current.canContinueToAdvancedPreferences).toBe(false)
    expect(result.current.canContinueToResults).toBe(false)
  })

  it('should update input values independently from selected options', () => {
    const { result } = renderHook(() => useSearchStepsData())

    act(() => {
      result.current.setAreaOfInterestValue('Ita')
      result.current.setCategoryValue('Sea')
    })

    expect(result.current.areaOfInterestValue).toBe('Ita')
    expect(result.current.categoryValue).toBe('Sea')
    expect(result.current.areaOfInterest).toBeNull()
    expect(result.current.category).toBeNull()
  })
})
