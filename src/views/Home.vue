<template>
  <div class="home-page">
    <navbar></navbar>
    <div class="home-body">
      <h2>Search Invoices</h2>
      <el-card class="filter-card m-b">
        <el-form class="t-l">
          <el-row type="flex" :gutter="12" align="bottom" justify="space-between">
            <el-col :md="7">
              <label>From</label>
              <div class="search-box f-w">
                <i class="el-icon-location el-input__prefix"></i>
                <places-search v-model="form.from" placeholder_text="From" v-on:input="onFromSearch"></places-search>
              </div>
            </el-col>
            <el-col :md="7">
              <label>To</label>
              <div class="search-box f-w">
                <i class="el-icon-location el-input__prefix"></i>
                <places-search v-model="form.to" placeholder_text="To" v-on:input="onToSearch"></places-search>
              </div>
            </el-col>
            <el-col :md="7">
              <label>Date</label>
              <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :md="3">
              <el-button type="primary" class="w-100">Search</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card> 

      <h2>Recent Invoices for you</h2>

      <el-card class="invoices-list" v-loading="loading">
        <div class="">
          <!-- <Invoice  v-for="invoice in invoices" :key="invoice.id" :readOnly="true" :invoicePO="invoice.purchase_order" @onClick="onInvoiceClick($event)"></Invoice> -->
  
          <PurchaseAbleInvoice v-for="invoice in invoices" :key="invoice.id" :invoice="invoice" @onClick="onInvoiceClick($event)" />
        </div>
      </el-card>

    </div>
    
  </div>
</template>
<script>
import Invoice from '@/components/Invoice';
import PurchaseAbleInvoice from '@/components/PurchaseAbleInvoice'
import invoiceContractService from '@/services/InvoiceContractService'
import PlacesSearch from '@/components/PlacesSearch'

export default {
  name: 'Home',
  data: function () {
    return {
      form: {
        from: '',
        to: '',
        date: ''
      },
      invoices: [],
      loading: false
    }
  },
  mounted: function() {
    this.address = this.$store.getters.address
    this.fetchInvoicesData()
    this.$store.dispatch('fetchInvoices', this.address).then(invoices => {
      // this.invoices = invoices
      // let bills = this.invoices.map(async invoice => {
      //   let flag = await invoiceContractService.userHasAlreadyBid(invoice.id)
      //   invoice.isApplied = flag
      // })
      // console.log("Bills manipulate")
      // console.log(bills)
    })
  },
  components: {
    Invoice,
    PurchaseAbleInvoice,
    PlacesSearch
  },
  methods: {
    onInvoiceClick: function (invoiceId) {
      console.log(invoiceId)
      this.$router.push(`/invoice/${invoiceId}`)
    },
    fetchInvoicesData: function () {
      let vm = this
      vm.loading = true
      invoiceContractService.fetchInvoices().then(async resp => {
        if (resp && resp.length) {
          for(let i = 0; i < resp.length; i++){
            let result = await invoiceContractService.fetchTargetInvoice(parseInt(resp[i]))
            let flag = await invoiceContractService.userHasAlreadyBid(parseInt(resp[i]))
            let bids = await invoiceContractService.fetchBids(parseInt(resp[i]))
            if (result && result.bollID) {
              this.$store.dispatch('fetchInvoiceByBolId', result.bollID).then(bol => {
                if (bol) {
                  vm.invoices.push({id: resp[i],bolID: result.bollID, bol: bol,basePrice: result.basePrice, discount: result.discount, createdAt: result.createdAt, isApplied: flag, totalBids: bids && bids.length ? bids.length : 0})
                  console.log("Invoice : ", vm.invoices.length)
                }
              })
            }
          }
          vm.loading = false
          console.log("Invoice Length: ", vm.invoices.length)
          console.log(vm.invoices)
        } else {
          vm.loading = false
        }
      }, error => {
        vm.loading = false
      })
    },
    onFromSearch: function (location) {
      this.form.from = location
      console.log(this.form)
    },
    onToSearch: function (location) {
      this.form.to = location
      console.log(this.form)
    }
  }
}
</script>
<style lang="scss">
@import '../scss/variables.scss';
.home-page {
  h1 {
    font-size: 2.75rem;
  }
  .home-body{
    width: 60%;
    height: 100%;
    margin: 100px auto;
    min-height: calc(100vh - 150px);
    margin-top: 8rem;
    text-align: left;
    color: #555555;

    .filter-card.el-card{
      .el-card__body{
        padding: 38px !important;
      }
    }
    .el-form-item{
      margin-bottom: 36px;
    }
    .f-w{
      width: 100% !important;
    }
    .el-input{
      margin-top: 0.5rem;

      .el-input__inner{
        padding-left: 50px;
      }
      .el-input__inner:focus {
        border: 1px solid #c0c4cc;
      }

      .el-input__inner:focus + .el-input__prefix {
        border: 1px solid #c0c4cc;
        border-right: none;
      }
    }

    .search-box {
      position: relative;
      margin-top: 0.5rem;

      input {
        padding-left: 50px;

        &:focus {
           border: 1px solid #c0c4cc;
         }
      }
    }

    .el-input__prefix{
      left: 0px;
      padding-left: 5px;
      padding-right: 8px;
      height: 95%;
      background-color: #f3f6f9;
      border: 1px solid #dcdfe6;
      border-right: none;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    .el-icon-location {
      width: 25px;
      line-height: 40px;
      border: none;
      left: 1px;
      top: 1px;
    }
  }
  .invoices-list.el-card{
    .el-card__body{
      padding: 0px;
    }
  }
}
</style>