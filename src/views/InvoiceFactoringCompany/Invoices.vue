<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <el-row class="content-wrapper" :gutter="12.5">
        <h1>Invoice Requests</h1>
        <el-col :span="6" :offset="2">
          <date-filter :filterValue="date_filter" @onFilterChange="onDateFilterChange($event)"></date-filter>
        </el-col>
        <el-col :span="14">
          <div class="card invoices-wrap">
            <!--<div class="invoices-header">-->
              <!--<p>Showing items 10 of 250</p>-->
            <!--</div>-->
            <div class="invoices-list">
              <Invoice  v-for="invoice in invoices" :key="invoice.id" :invoicePO=invoice.purchase_order @onClick="onClick"></Invoice>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/Invoice'
import DateFilterComponent from '@/components/filters/Date'

export default {
  name: 'InvoicesPage',
  data () {
    return {
      invoices: [],
      date_filter: null
    }
  },
  components: {
    Invoice,
    'date-filter': DateFilterComponent
  },
  mounted () {
    this
      .$store
      .dispatch('fetchInvoices')
      .then(invoices => {
        this.invoices = invoices
      })
  },
  methods: {
    searchInvoices () {
      this.$set(this.filters, 'searchText', this.filters.searchInput)
    },
    clearSearch () {
      this.$set(this.filters, 'searchText', null)
      this.$set(this.filters, 'searchInput', null)
    },
    onClick: function (invoiceId) {
      this.$router.push({ name: 'InvoiceDetailPage', params: {invoiceId: invoiceId} })
    },
    onDateFilterChange: function (filterValue) {
      this.date_filter = filterValue
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.border {
  border: 1px solid black;
}
.content-wrapper {

  h1 {
    /*margin: 3rem auto;*/
  }

  .card {
    min-height: 100px;
    background: #ffffff;
    border: 1px solid;
  }

  .invoices-wrap {

    .invoices-header {
      margin: 0;
      padding: 35px 15px;

      p {
        margin: 0;
        padding: 0 10px;
        border-bottom: 1px solid $border-color;
        text-align: left;
      }
    }
  }
}
</style>