<template>
  <div class="invoice-wrap" v-if="invoice && invoice.id" @click="onSelect(invoice.id)">
    <!-- <h3 class="po" @click="onSelect(invoice.id)">Invoice #{{invoice.id}}</h3>
    <h3>Receivable Amount: {{invoice.basePrice}}</h3>
    <h3>Discount on instant cash: {{invoice.discount}}</h3>
    <h3>{{invoice.createdAt}}</h3> -->
    <el-row type="flex" align="bottom" justify="space-between">
      <h3 class="po">Invoice #{{invoice.id}}</h3>
      <p class="applied" v-if="invoice.isApplied"> <i class="el-icon-circle-check-outline"></i> Applied</p>
    </el-row>
    <el-row type="flex" justify="space-between">
      <div>
        <h4 class="half-margin">Receivable Amount: {{invoice.basePrice}}</h4>
      </div>
      <div>
        <h4>Discount on instant cash: {{invoice.discount}}%</h4>
      </div>
    </el-row>
    <h4 class="title">
      <span>
        {{invoice.bol.shipper.city}}, {{invoice.bol.shipper.state}}
      </span>
      <!--<i class="el-icon-back"></i>-->
      <span>
        {{invoice.bol.consignee.city}}, {{invoice.bol.consignee.state}}
      </span>
    </h4>
    <span>Shipment Date: {{invoice.bol.date}}</span>
    <span class="right">{{invoice.bol.items.length}} items - {{invoice.bol.total_weight}} lbs approx.</span>
    <el-row type="flex" align="middle" justify="space-between" class="m-t">
      <div>
        <el-badge class="badge distance" v-if="invoice.bol.total_distance">{{invoice.bol.total_distance}}</el-badge>
        <el-badge class="badge bids">{{invoice.totalBids}} bids</el-badge>
      </div>
    </el-row>
    
  </div>
</template>

<script>

export default {
  name: 'PurchaseAbleInvoice',
  props: ['invoice'],
  data () {
    return {
      showAddBolToMarketPlaceDialog: false
    }
  },
  mounted () {
    // this.$store.dispatch('fetchInvoiceByBolId', this.invoice.id).then(invoice => {
    //   if (invoice) {
    //     this.invoice = invoice
    //   }
    // })
  },
  methods: {
    onSelect: function(bolID) {
      console.log("Invoice ID: ", bolID)
      this.$emit('onClick', bolID)
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
  border-bottom: 1px solid $border-color;
  text-align: left;
  color: #555555;
  &:hover {
  }

  .po {
    margin: 1rem 0 0;
    color: lighten(map_get($theme-colors, primary_button), 15%);
  }

  .half-margin {
    margin-top: 1rem;
  }

  .title {
    margin: 0;
    position: relative;
    top: 5px;
    color: #555555;
    padding: 0.5rem 0;
    font-weight: normal;
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;

    span {
      &::before {
         font-size: 0.85rem;
         position: absolute;
         top: -15px;
         color: #333333;
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
    background: map_get($theme-colors, secandry_button);
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
    color: green;
    font-weight: bold;
    i{
      font-weight: bold;
    }
  }
}
.invoice-wrap:nth-child(odd) {
  background: #f8fbff;;
}
</style>