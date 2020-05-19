<template>
  <div class="user-type-page center-align">
    <div>
      <h1>Who You Are?</h1>
      <el-row type="flex" align="center" justify="center">
        <el-card class="m-r user-type" @click.native="onUserSelect('shipper')">
          <i class="fas fa-truck-loading"></i>
          <h2 class="m-b-0">Shipper</h2>
        </el-card>
        <el-card class="m-l user-type" @click.native="onUserSelect('carrier')">
          <i class="fas fa-shipping-fast"></i>
          <h2 class="m-b-0">Carrier</h2>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserTypePage',
  methods: {
    onUserSelect: function(userType) {
      this.$store.commit('setUserType', userType)
      if (userType === 'shipper') {
        this.$router.push('/shipper/invoices')
      }
      if (userType === 'carrier') {
        this.$router.push('/carrier')
      }
    }
  }
}
</script>
<style lang="scss">
@import '../scss/variables.scss';
.user-type-page {
  background-image: url("../assets/bg.svg");
  background-size: 15%;

  h1 {
    font-size: 2.75rem;
  }

  .el-card.user-type {
    cursor: pointer;
    .el-card__body {
      padding: 3rem 4.5rem;

      i { font-size: 3rem; }
    }

    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
      h2, i { color: $primary_brand; }
    }
  }
}
</style>