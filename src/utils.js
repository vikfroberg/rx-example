export * from 'ramda'

export const trace =
  (a) => {
    console.log(a)
    return a
  }

export const targetValue =
  (e) => e.target.value

export const preventDefault =
  (e) => {
    e.preventDefault()
    return e
  }
