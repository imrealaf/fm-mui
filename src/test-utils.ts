import mediaQuery from 'css-mediaquery'

export function createMatchMedia(width: any) {
  return (query: any) => ({
    matches: mediaQuery.match(query, {
      width
    }),
    addListener: () => {},
    removeListener: () => {}
  })
}

export const useStateMock = (setState: () => void) => {
  const mock: any = (state: any) => [state, setState]
  return mock
}
