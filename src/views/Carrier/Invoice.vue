<template>
  <div class="invoice-detail">
    <div class="container">
      <h2 class="t-l">Invoice #sdf788sdf</h2>
      <el-row :gutter="24" type="flex" align="center">
        <el-col :md="17">
          <el-tabs :stretch="true">
            <el-tab-pane label="Items">
              <invoice-items :items="invoice.items"></invoice-items>
            </el-tab-pane>
            <el-tab-pane label="Bids">
              <invoice-bids :bids="bids"></invoice-bids>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :md="7">
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
import InvoiceBidsComponent from '@/components/Bids';
import InvoiceShipper from '@/components/Shipper';
import InvoiceConsignee from '@/components/Consignee';
import invoiceContractService from '../../services/InvoiceContractService'

export default {
  name: 'InvoiceDetailsPage',
  data: function () {
    return {
      activeIndex: '1',
      invoice: {},
      bids: []
    }
  },
  components: {
    'invoice-items': InvoiceItems,
    'invoice-bids': InvoiceBidsComponent,
    'invoice-shipper': InvoiceShipper,
    'invoice-consignee': InvoiceConsignee
  },
  mounted: function() {
    this.$store.dispatch('fetchInvoiceByBolId', this.$route.params.invoiceId).then(invoice => {
      if (invoice) {
        this.invoice = invoice
        if (this.invoice && this.invoice.id) {
          this.fetchBids()
        }
      }
    })
  },
  methods: {
    handleSelect: function () {

    },

    fetchBids: function () {
      console.log('Fetching Bids')
      invoiceContractService.fetchBids(this.invoice.id).then((resp) => {
        console.log("Resp: ", resp)
        if (resp && resp.length) {
          for(let i = 0; i < resp.length;i++){
            invoiceContractService.fetchBid(parseInt(resp[i])).then((bid) => {
              console.log('Show Bid response')
              console.log(bid)
              if (bid.createdAt > 0) {
                let bidData = {
                  id: resp[i],
                  billId: bid.billId,
                  amount: bid.amount,
                  bidder: bid.bidder
                }
                this.bids.push(bidData)
              }
            })
          }
        }
      })
    }

  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.invoice-detail {
  margin-top: 7rem;
  padding-bottom: 2rem;
  h2 {
    color: #555;
    margin: 2rem 0;
  }
  .el-tabs{
    .el-tabs__header{
      .el-tabs__nav-scroll{
        background-color: #ffffff;
        border: 1px solid #dcdfe6;

        .el-tabs__active-bar{
          background-color: transparent;
        }
        .el-tabs__item{
          height: 48px;
          line-height: 48px;
        }
        .el-tabs__item:first-child{
          border-right: 1px solid #dcdfe6;
        }
        .el-tabs__item:last-child{
          border-left: 1px solid #dcdfe6;
        }
        .el-tabs__item.is-active{
          background-color: #f9f9f9;
          color: #0166cc;
        }
        .el-tabs__item:hover{
          color: #0166cc;
        }
      }
    }
  }
}
</style>