import { useState } from 'react'

/**
 * useAccordion
 * @description utility for controlling the state of an accordion
 */

export interface UseAccordion {
  /** The visibility state */
  expanded: string | false

  isExpanded(id: string): boolean

  /** Method to toggle item by id */
  toggle(
    id: string
  ): (_event: React.SyntheticEvent, isExpanded: boolean) => void
}

const useAccordion = (initial: string | false = false): UseAccordion => {
  const [expanded, setExpanded] = useState(initial)
  const toggle =
    (id: string) => (_event: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? id : false)
  const isExpanded = (id: string) => {
    return expanded === id
  }

  return {
    expanded,
    isExpanded,
    toggle
  }
}

export default useAccordion
