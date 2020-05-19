<template>
  <div class="signup-page auth-page">
    <el-row type="flex" align="middle" >
      <div class="logo">
        <img src="@/assets/logo-1.svg">
      </div>
    </el-row>
    <div class="card-holder">
      <el-card>
        <el-row type="flex" align="middle">
          <el-col :md="24" class="form-side">
            <h3 class="t-l">Sign Up</h3>
            <el-form ref="form" :rules="rules" :model="user">
              <el-form-item label="Name" prop="name">
                <el-input type="text" v-model="user.name" placeholder="Enter your name"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="user.email" placeholder="Enter your email"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="user.password" placeholder="Enter password"></el-input>
              </el-form-item>
              <el-form-item label="User Type" prop="role">
                <el-select class="w-100" v-model="user.role" placeholder="Select user type">
                  <el-option label="Factoring Company" value="invoice_factoring_company">
                  </el-option>
                  <el-option label="Invoice Seller" value="invoice_holder">
                  </el-option>
                </el-select>
              </el-form-item>
              <div class="t-l">
                <el-checkbox v-model="checked">I agree to all <a href="#">Terms & Conditions</a></el-checkbox>
              </div>
              <el-form-item></el-form-item>
              <el-row class="t-c">
                <el-button type="primary" class="w-100 m-b" @click="onSubmit" id="submit-button">Sign Up</el-button>
              </el-row>
              <el-row class="t-c">
                <el-button type="default" class="w-100 bordered m-b" @click="login">Sign In</el-button>
              </el-row>
              <!-- <p>Already have an account? <br /><router-link to="/auth/signin">Login</router-link></p> -->
            </el-form>
            <el-row class="social-links">
              <i class="fab fa-facebook" @click="openLink('https://www.facebook.com/blockarray')"></i>
              <i class="fab fa-twitter" @click="openLink('https://www.twitter.com/blockarraygroup')"></i>
              <i class="fab fa-google-plus-g" @click="openLink('https://www.googleplus.com/blockarray')"></i>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- <div class="watermark">
      <h1>INVOICETAP</h1>
    </div> -->
  </div>
</template>
<script>
import validationRules from '@/shared/validations'

export default {
  name: 'Signup-Page',
  data: function () {
    // var validateConfirmPassword = (rule, value, callback) => {
    //   if (value !== this.user.password) {
    //     callback(new Error('Password not match'))
    //   }
    //   callback()
    // }
    return {
      user: {},
      checked: false,
      rules: validationRules
    }
  },
  methods: {
    onSubmit: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.user)
          let user = { ...this.user }
          this.$store.dispatch('signup', [user, {show_loading: true, fullscreen: false, target: '#submit-button'}]).then((user) => {
            switch(user.role){
              case 'invoice_holder':
                this.$router.push('/home')
              case 'invoice_factoring_company':
                this.$router.push('/carrier/invoices')
              default:
                this.$router.push('/home')
            }
          })
        }
      })
    },
    login: function () {
      this.$router.push('/auth/signin')
    }
  }
}
</script>
<style lang="scss">
  .signup-page{
  }
  .el-select-dropdown {
    z-index: 15000 !important;
  }
</style>
