export const logDev = (data: any, label = '') => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${label ? `${label}:` : ''}`, data)
  }
}
