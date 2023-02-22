export const logDev = (data: any, label = '') => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${label ? `${label}:` : ''}`, data)
  }
}

export const randomString = (
  len = 16,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
  var randomString = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}

export const generateYears = () => {
  var max = new Date('2008-01-01').getFullYear()
  var min = max - 60
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}

export const generateDays = () => {
  const days = []
  for (let index = 1; index <= 31; index++) {
    days.push(`${index < 10 ? '0' : ''}${index}`)
  }
  return days
}
