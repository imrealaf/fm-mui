export type PaletteColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'inherit'
  | 'black'
  | 'white'
  | 'neutral'
  | 'grey1'
  | 'grey2'
  | 'grey3'
  | 'grey4'
  | 'grey5'
  | 'grey6'
  | 'grey7'
  | 'grey8'
  | undefined

export type SectionCardRow = {
  label: string
  value: React.ReactNode
  path?: string
  onClick?(): void
  alignLabel?: string
  alignValue?: string
  hideArrow?: boolean
  disableHover?: boolean
}

export type BirthdayMap = {
  month: string | undefined
  day: string | undefined
  year: string | undefined
}

export type Gender = 'Male' | 'Female' | 'Rather not say'
