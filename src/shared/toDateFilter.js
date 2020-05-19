export default (timestamp) => {
  if (timestamp) {
    let date = new Date(timestamp * 1000)
    let formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString()
    return formattedDate
  }
  return ''
}
