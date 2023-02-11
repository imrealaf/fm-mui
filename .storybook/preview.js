import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
]
