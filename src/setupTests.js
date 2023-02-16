import { createMatchMedia } from './test-utils'

beforeAll(() => {
  window.matchMedia = createMatchMedia(window.innerWidth)
})
