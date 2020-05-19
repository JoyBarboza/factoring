<template>
  <div class="signin-page auth-page">
    <el-row type="flex" align="middle" >
      <div class="logo">
        <img src="@/assets/logo-1.svg">
      </div>
    </el-row>
    <div class="card-holder">
      <el-card>
        <el-row type="flex" align="middle">
          <el-col :md="24" class="form-side">
            <h3 class="t-l">Sign In</h3>
            <el-form ref="form" :rules="rules" :model="user">
              <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="user.email" placeholder="Enter your email"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="user.password" placeholder="Enter password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row type="flex" align="middle" justify="space-between">
                  <el-switch v-model="remember"  active-text="Remember me"></el-switch>
                  <router-link to="/auth/forgot">Forgot Password ?</router-link>
                </el-row>
              </el-form-item>
              <el-row class="t-c">
                <el-button type="primary" class="w-100" @click="onSubmit" id="submit-button">Sign In</el-button>
              </el-row>
              <p>Don't have an account yet? <br /><router-link to="/auth/signup">Create account?</router-link></p>
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
  name: 'Signin-Page',
  data: function () {
    return {
      remember: null,
      user: {},
      rules: validationRules
    }
  },
  methods: {
    onSubmit: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let user = { ...this.user }
          this.$store.dispatch('signin', [user, {show_loading: true, fullscreen: false, target: '#submit-button'}]).then((user) => {
            switch(user.role){
              case 'invoice_holder':
                this.$router.push('/home')
                break
              case 'invoice_factoring_company':
                this.$router.push('/carrier/invoices')
                break
              default:
                this.$router.push('/home')
                break
            }
          })
        }
      })
    },
    register: function () {
      this.$router.push('/auth/signup')
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/variables";
  .signin-page{
    padding: 4rem 8rem;
    background-color: #002d7b;
    .logo{
      margin-bottom: 4rem;
    }
    .card-holder{
      width: 35rem;
      max-width: 90%;
      margin: auto;
    }
    .form-side{
      padding: 2rem 5rem;
    }
    .el-card__body{
      padding: 0px;
    }
    a{
      color: $secondary_brand;
    }
    .social-links i{
      margin: 0px 0.5rem;
    }
  }
</style>
