export default function (text, length) {
  if (text && text.length > length) {
    text = text.substr(0, length)
    text += '...'
  }
  return text
}
