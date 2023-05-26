export const getToday = () => {
  let date = new Date().getTime()

  let d = new Date(date).toLocaleString('pt-BR')

  return d
}