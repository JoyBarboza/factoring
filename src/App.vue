<template>
  <div id="app">
    <div v-if="!isConnected">
      <connectmetamask />
    </div>
    <div v-if="isConnected">
      <router-view/>
    </div>
  </div>
</template>

<script>
import web3Service from '@/services/web3Service.js'
import ConnecMetamask from '@/components/ConnectMetamask'
export default {
  name: 'app',
  data: function() {
    return {
      isConnected: false
    }
  },
  components: {
    connectmetamask: ConnecMetamask
  },
  mounted: function () {
    // Get invoices on app load.
    // These are BOLs created by current user.
    this
      .$store
      .dispatch('fetchInvoices')
      .then(invoices => {
        this.invoices = invoices
      })
    this.getAccounts()
    web3Service.watchMetamaskAddressUpdate(() => {
      window.location.reload();
    })
  },
  methods: {
    getAccounts: function () {
      web3Service.getAccounts().then((accounts) => {
        if (accounts) {
          this.$store.commit('setAddress', accounts)
          this.afterMetamaskConnect()
        } else {
          this.checkAgain()
        }
      })
    },
    afterMetamaskConnect: function () {
      this.isConnected = true
      this.redirectOnConnect()
    },
    checkAgain: function () {
      this.isConnected = false
      setTimeout(() => {
        this.getAccounts()
      }, 1000)
    },
    redirectOnConnect: function () {
      let user = this.$store.getters.user
      if (user) {
        console.log(this.$route)
        if(this.$route.path === '/'){
          this.$router.push('/home')
        }
        // if (user.role === 'invoice_factoring_company') {
        //   this.$router.push('/home')
        // }
        // if (user.role === 'invoice_holder') {
        //   this.$router.push('/carrier/invoices')
        // }
      } else {
        this.$router.push('/auth/signin')
      }
    }
  }
}
</script>

<style lang="scss">
@import "scss/variables.scss";

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Thin.ttf');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-ThinItalic.ttf');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Light.ttf');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-LightItalic.ttf');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Regular.ttf');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Italic.ttf');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Medium.ttf');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-MediumItalic.ttf');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Bold.ttf');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-BoldItalic.ttf');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-Black.ttf');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/Roboto-BlackItalic.ttf');
  font-weight: 800;
  font-style: italic;
}

body * {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: map_get($theme-colors, primary);
}

#app > * {
  min-height: 100vh;
  display: grid;
  background-color: #ffffff;
}

</style>
