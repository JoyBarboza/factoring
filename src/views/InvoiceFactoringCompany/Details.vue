<template>
  <div class="factoring-company-invoice-details">
    <navbar></navbar>
    <div class="container">
      <h2 class="t-l" v-if="invoice">Invoice #{{invoice.purchase_order}}</h2>
      <div class="t-l totla_items m-b">
        <small class="gray">Total {{invoice.items && invoice.items.length ? invoice.items.length : 0}} Items</small>
      </div>
      <el-row :gutter="24" type="flex" align="center">
        <el-col :md="18">
          <invoice-items v-if="invoice" :items="invoice.items" :weight="invoice.total_weight"></invoice-items>
        </el-col>
        <el-col :md="6">
          <div class="m-b">
            <bid @onAmountSubmit="placeBid" @onAmountEdit="bidStates.success = false" @onBidRetract="retractBid" :states="bidStates" :bid="quoteAmount"></bid>
          </div>
          <div class="m-b">
            <invoice-shipper :shipper="invoice.shipper"></invoice-shipper>
          </div>
          <div>
            <invoice-consignee :consignee="invoice.consignee"></invoice-consignee>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import InvoiceItems from '@/components/Items';
import InvoiceShipper from '@/components/Shipper';
import InvoiceConsignee from '@/components/Consignee';
import BidComponent from '@/components/Bid'
import invoiceContractService from '@/services/InvoiceContractService'

export default {
  name: 'InvoiceDetailsPage',
  data () {
    return {
      invoice: {},
      quoteAmount: 0,
      bidStates: {
        loading: false,
        success: false,
        failed: false
      }
    }
  },
  components: {
    'bid': BidComponent,
    'invoice-items': InvoiceItems,
    'invoice-shipper': InvoiceShipper,
    'invoice-consignee': InvoiceConsignee
  },
  mounted: function() {
    this.$store.dispatch('fetchInvoiceByBolId', this.$route.params.invoiceId).then(invoice => {
      if (invoice) {
        this.invoice = invoice
        //TODO: fetch current accounts bid on this invoice
        this.fetchMyBid()
      }
    }).catch(err => console.log(err))
  },
  methods: {
    placeBid (amount) {
      this.bidStates.loading = true
      invoiceContractService.submitQuote({ billId: this.invoice.id, amount: amount }).then(reciept => {
        if (reciept && reciept.events && reciept.events.BidAdded) {
          this.bidStates.loading = false
          this.bidStates.success = true
          this.showSuccess('Your quote is submitted.')
        } else {
          this.bidStates.loading = false
          this.bidStates.success = false
          this.showError('Something went wrong. Your quote is not submitted.')
        }
      }, error=> {
        this.bidStates.loading = false
        this.bidStates.success = false
      })
      // setTimeout(() => {
      //   this.bidStates.loading = false
      //   this.bidStates.success = true
      // }, 5000)
    },
    retractBid () {
      this.$confirm('Are you sure you want to retract this bid?', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      })
        .then(() => {
          invoiceContractService.removeQuote(this.invoice.id).then(resp => {
            if (resp) {
              this.fetchMyBid()
            }
          })
        });
    },
    fetchMyBid() {
      this.bidStates.loading = true
      invoiceContractService.fetchMyBid(this.invoice.id).then(resp => {
        this.bidStates.loading = false
        if (resp.createdAt > 0 && resp.deletedAt <= 0) {
          this.bidStates.success = true
          this.quoteAmount = parseInt(resp.amount)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.factoring-company-invoice-details{
  color: #555;
  margin-top: 8rem;

  h2{
    margin-bottom: 0.5rem;
  }
}
.el-message-box__btns {
  padding: 5px 8px 12px !important;
  display: flex !important;
  justify-content: space-around !important;

  button {
    width: 45%;
  }
}
</style>