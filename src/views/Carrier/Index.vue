<template>
	<div class="shipper-index-page">
		<div class="container content-wrapper">
      <el-row :gutter="48">
        <el-col :span="12" :offset="8">
          <h2 class="t-l">My Invoices</h2>
        </el-col>
      </el-row>
      <el-row class="" :gutter="48">
        <el-col :span="6" :offset="2">
          <show-invoices-filter :filterValue="show_invoices_filter" @onFilterChange="onShowInvoiceFilterChange($event)"></show-invoices-filter>
          <date-filter :filterValue="date_filter" @onFilterChange="onDateFilterChange($event)"></date-filter>
          <status-filter :filterValue="status_filter" @onFilterChange="onStatusFilterChange($event)"></status-filter>
        </el-col>
        <el-col :span="14">
          <div class="card invoices-wrap">
            <div class="invoices-list">
              <Invoice  v-for="invoice in invoices" :key="invoice.id" :invoicePO="invoice.purchase_order" @onClick="onInvoiceClick($event)"></Invoice>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
	</div>
</template>
<script>
import Invoice from '@/components/Invoice';
import DateFilterComponent from '@/components/filters/Date';
import StatusFilterComponent from '@/components/filters/Status';
import ShowInvoicesFilterComponent from '@/components/filters/ShowInvoices';

export default {
	name: 'ShipperIndexPage',
	data: function () {
		return {
			address: null,
			invoices: [],
      date_filter: 'newest',
      status_filter: 'all',
      show_invoices_filter: 'all'
		}
	},
  components: {
    Invoice,
    'date-filter': DateFilterComponent,
    'status-filter': StatusFilterComponent,
    'show-invoices-filter': ShowInvoicesFilterComponent
  },
	mounted: function() {
		this.address = this.$store.getters.address
		this.$store.dispatch('fetchInvoices', this.address).then(invoices => {
			this.invoices = invoices
      console.log(this.invoices.length)
		})
	},
	methods: {
    onInvoiceClick: function (invoiceId) {
      this.$router.push(`invoice/${invoiceId}`)
    },
    onDateFilterChange: function (filterValue) {
      this.date_filter = filterValue
    },
    onStatusFilterChange: function (filterValue) {
      this.status_filter = filterValue
    },
    onShowInvoiceFilterChange: function (filterValue) {
      this.show_invoices_filter = filterValue
    }
	}
}
</script>
<style lang="scss">
@import "../../scss/variables.scss";

.border {
  border: 1px solid black;
}
.content-wrapper {
  margin-top: 5rem;

  h2 {
    color: #555;
    /*margin: 3rem auto;*/
  }

  .card {
    min-height: 100px;
    background: #ffffff;
    box-shadow: none;
  }

  .invoices-wrap {
    .invoices-header {
      margin: 0;
      padding: 35px 15px;

      p {
        margin: 0;
        padding: 0 10px;
        border: 1px solid $border-color;
        text-align: left;
      }
    }
  }
}
</style>