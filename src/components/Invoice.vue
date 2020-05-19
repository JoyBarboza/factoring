<template>
  <div class="invoice-wrap" v-if="invoice && invoice.id" style="position: relative;">
    <el-row type="flex" align="middle" justify="space-between">
      <h3 class="po" @click="onSelect(invoice.id)">#{{invoice.purchase_order}}</h3>
      <div class="call-to-action">
        <p class="applied" v-if="invoice.isApplied"> <i class="el-icon-circle-check-outline"></i> Applied</p>
<!--         <el-button type="primary" size="mini" v-if="!readOnly && !invoice.submitted" @click="showDialog()">Add to market place</el-button>
 -->        <a class="link" @click="showDialog()" v-if="!readOnly && !invoice.submitted">Add to market place</a>
        <p class="applied" v-if="invoice.submitted"> <i class="el-icon-circle-check-outline"></i> Submitted to marketplace</p>
      </div>
    </el-row>
    <h4 class="title">
      <span>
        {{invoice.shipper.city}}, {{invoice.shipper.state}}
      </span>
      <!--<i class="el-icon-back"></i>-->
      <span>
        {{invoice.consignee.city}}, {{invoice.consignee.state}}
      </span>
    </h4>
    <span>Shipment Date: {{invoice.date}}</span>
    <span class="right">{{invoice.items.length}} items - {{invoice.total_weight}} lbs approx.</span>
    <el-row type="flex" align="middle" justify="space-between">
      <div>
        <el-badge class="badge distance" v-if="invoice.total_distance">{{invoice.total_distance}}</el-badge>
<!--         <el-badge class="badge bids">{{invoice.totalBids}} bids</el-badge> -->
      </div>
    </el-row>
    <AddBolToMarketPlace :dialogVisible="showAddBolToMarketPlaceDialog" :invoice="invoice" @close="hideDialog" />
  </div>
</template>

<script>
import AddBolToMarketPlace from './AddBolToMarketPlace'
import invoiceContractService from '@/services/InvoiceContractService'

export default {
  name: 'Invoice',
  props: ['invoicePO', 'onInvoiceClick', 'readOnly'],
  components: {
    AddBolToMarketPlace
  },
  data () {
    return {
      invoice: {},
      showAddBolToMarketPlaceDialog: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchInvoice', this.invoicePO).then(async invoice => {
      if (invoice) {
        invoice.submitted = await invoiceContractService.isBOLAlreadySubmitted(invoice.id)
        this.invoice = invoice
      }
    })
  },
  methods: {
    onSelect: function(invoiceID) {
      console.log("Invoice ID: ", invoiceID)
      this.$emit('onClick', invoiceID)
    },
    showDialog: function () {
      this.showAddBolToMarketPlaceDialog = true
    },
    hideDialog: function () {
      this.showAddBolToMarketPlaceDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.invoice-wrap {
  padding: 1rem 2rem 2rem;
  position: relative;
  cursor: pointer;
  border: 1px solid $border-color;
  text-align: left;
  position: relative;
  color: #555555;

  &:hover {
    /*background: darken(#ffffff, 2.5%);
    border: 1px solid $border-color-active;*/
    box-shadow: none;
  }

  .po {
    margin: 1rem 0;
    color: lighten(map_get($theme-colors, primary_button), 15%);
  }

  .link{
    color: lighten(#64B5F6, 10%);
    border-bottom: 1px solid lighten(#64B5F6, 10%);
    padding-bottom: 0.1rem;
    font-weight: bold;
  }

  .title {
    margin: 0;
    position: relative;
    top: 5px;
    color: #555555;
    padding: 0.5rem 0;
    display: flex;
    font-weight: normal !important;
    justify-content: space-between;

    span {
      &::before {
         font-size: 0.85rem;
         position: absolute;
         top: -15px;
         color: #555555;
       }
      &:first-child {
        &::before {
          content: "From";
         }
       }

      &:last-child {
       /*float: right;*/

        &::before {
          content: "To";
          right: 0;
         }
       }
    }
    .el-icon-back {
      transform: rotate(180deg);
      font-size: 1.5rem;
      position: relative;
      top: -10px;
    }
  }
  .badge{
    margin: 0 0.2rem;
    padding: 0 0.5rem;
    background: #d3d3d3;
    border-radius: 6px;
    background: #409eff;
    border-color: #409eff;
    color: #ffffff;
  }
  p {
    margin: 0;
  }

  .right {
    float: right;
  }

  .applied{
    
    color: map_get($theme-colors, secandry_button);
    font-weight: bold;
    i{
      font-weight: bold;
    }
  }
  .call-to-action{
  }
  .el-button--default{
    color: #ffffff;
    background-color: map_get($theme-colors, bars_color);
  }
}
.invoice-wrap:nth-child(odd) {
  background: #f8fbff;
}
</style>