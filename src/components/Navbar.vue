<template>
  <div class="navbar">
    <el-menu mode="horizontal" :router="false">
      <el-row type="flex" justify="end" align="middle">
        <div class="logo">
          <img src="../assets/logo-1.svg" @click="gotoDashboard()">
        </div>
        <el-submenu index="2">
          <template slot="title">
            <span class="uppercase user-initials">{{user && user.name ? (name.charAt(0) + name.charAt(1)) : 'FT'}}</span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title">Hello {{name}}</span> -->
            <!-- <el-menu-item index="2-1" @click="gotoProfilePage">My Profile</el-menu-item> -->
            <el-menu-item index="2-2" @click="logout">Logout</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
import web3Service from '@/services/web3Service'

export default {
  name: 'Navbar',
  data: function () {
    return {
      user: {},
      web3: web3Service,
      initials: 'UK',
      ethBalance: 0,
      aryBalance: 0,
      aryTokenAddress: process.env.VUE_APP_ARY_TOKEN_ADDRESS
    }
  },
  mounted: function () {
    this.user = this.$store.getters.user
    web3Service.getAccounts().then(address => {
      if (address) {
        this.getBalance(address)
        this.getTokenBalance(address)
      }
    }, error => {
    })
  },
  computed: {
    name: function () {
      return this.user.name
    },
    network: function () {
      return this.web3.network
    },
    address: function () {
      return this.web3.accounts[0]
    }
  },
  methods: {
    getBalance: function (address) {
      web3Service.getBalance(address).then(resp => {
        this.ethBalance = resp
      })
    },
    getTokenBalance: function (address) {
      web3Service.getTokenBalance(address, this.aryTokenAddress).then(resp => {
        this.aryBalance = resp

      })
    },
    gotoDashboard: function () {
      this.$router.push('/home')
    },
    gotoProfilePage: function () {
    },
    logout: function () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/auth/signin')
    }
  }
}
</script>

<style lang="scss">
@import "../scss/variables";

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  background: $primary_brand;
  box-sizing: border-box;
  padding: 0.4rem 0.75rem;

  .logo {
    flex-grow: 1;
    text-align: left;
    margin: 0;
    padding: 0 20px;
    display: flex;
    cursor: pointer;

    img {
      height: 32px;
    }
  }

  .user-initials {
    padding: 0.6rem 0.8rem;
    background: #64B5F6;
    color: white;
    border-radius: 50%;
    font-size: 1rem;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      border: 2px solid #FFFFFF;
      background-color: #0EC99B;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  li[role=menuitem] {
    /* border-left: 1px solid #f5f3f3; */
    color: white;
  }

  .el-menu {
    background: transparent;
    border-bottom: none !important;

    .el-menu-item-group__title {
      padding: 14px 10px 10px;
      text-transform: uppercase;

      span {
        font-weight: bold;
        font-size: 1rem;
      }
    }

    .el-menu-item {
      height: 45px;
      line-height: 45px;
      display: flex;
      align-items: center;
      flex-direction: column;
      line-height: normal;

      &:hover, &:focus {
        color: white;
      }
    } 

    .el-submenu__icon-arrow {
      display: none;
    }

    .el-submenu__title {
      i {
        margin-right: 8px;
      }
    }

    .el-submenu__title:hover, .el-menu-item:hover {
      background-color: transparent;
    }

    a {
      text-decoration: none;
      font-size: 1rem;
    }
    a:hover {
      color: white;
    }
  }
}
</style>
