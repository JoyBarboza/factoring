<template>
  <div class="connect-metamask auth-container">
    <div class="auth-card-holder t-c">
      <el-card class="padded">
        <img class="metamask-icon" src="../assets/metamask.png">
        <h1>Metamask not Connected</h1>
        <p class="m-b-0">You need to connect MetaMask to continue using this application.</p>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectMetamask-Page'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.connect-metamask {
    .auth-card-holder{
      position: absolute;
      width: 550px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

  .metamask-icon {
    width: 7rem;
  }
}
</style>
