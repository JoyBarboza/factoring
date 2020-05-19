export default (number) => {
  if (!number) {
    return 0
  }

  let ether = window.web3.fromWei(number, 'ether')
  ether = parseFloat(ether).toFixed(2)

  return ether
}
