<template>
  <el-dialog
    title="Add BOL to InvoiceTap"
    custom-class="addtomarketplace-dialog"
    :visible.sync="dialogVisible"
    v-loading="loading"
    :before-close="onCancel">
    <div>
      <h3 class="po">#{{invoice.purchase_order}}</h3>
      <h3 class="title">
        <span>
          {{invoice.shipper.city}}, {{invoice.shipper.state}}
        </span>
        <span>
          {{invoice.consignee.city}}, {{invoice.consignee.state}}
        </span>
      </h3>
      <span>Shipment Date: {{invoice.date}}</span>
      <span class="right">{{invoice.items.length}} items - {{invoice.total_weight}} lbs approx.</span>
      <el-form>
        <el-form-item label="Propose discount">
          <el-input v-model="discount" placeholder="Propse discount"></el-input>
          <small>Discount which you are offering to funders in return of instant cash.</small>
        </el-form-item>
        <div class="t-r">
          <el-button type="primary" @click="submit()">Submit</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import invoiceContractService from '../services/InvoiceContractService'

export default {
  name: 'AddBolToMarketPlace',
  data: function () {
    return {
      loading: false,
      discount: null
    }
  },
  props: ['dialogVisible', 'invoice'],
  mounted: function () {
  },
  methods: {
    submit: function () {
      let bill = {
        bolID: this.invoice.id,
        basePrice: 5000,
        discount: this.discount
      }
      this.loading = true
      invoiceContractService.submitBOL(bill).then(resp => {
        console.log("BOL submitted")
        console.log(resp)
        this.loading = false
        if (resp.events && resp.events.InvoiceAdded) {
          //this.showSuccess('Bill Added successfully.')
          this.onCancel()
        }
      }, error => {
        this.loading =false
      })
    },
    onCancel: function () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
@import "../scss/variables.scss";

  .po {
    margin: 1rem 0;
    color: lighten(map_get($theme-colors, secondary), 15%);
  }
  .addtomarketplace-dialog{
    width: 30% !important;
    .el-dialog__body{
      padding: 0px 20px 30px;
    }
  }
</style>