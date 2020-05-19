import BN from "bn.js"

export default (number) => {
  if (!number) {
    return 0
  }
  let token_decimals = process.env.VUE_APP_ARY_TOKEN_DECIMALS
  token_decimals = token_decimals / 2
  console.log(number)
  // Cannot create a BigNumber greater than 2^53 (~10^16).
  let balanceInWei =  new window.web3.BigNumber(number)
  let divider = new BN(Math.pow(10, token_decimals))
  balanceInWei = balanceInWei.div(divider)
  balanceInWei = balanceInWei.div(divider).toString()

  let balanceInAry = parseFloat(balanceInWei)

  return balanceInAry
}
