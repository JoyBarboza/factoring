<template>
  <div class="invoice-bids">
    <div class="t-l">
      <div class="card-header">
        <!-- <h3 class="m-0">Bids</h3> -->
        <small class="gray">Total {{bids && bids.length ? bids.length : 0}} Bids</small><small class="gray" v-if="weight"> - {{weight}} lbs.</small>
      </div>
      <div class="card-content">
        <el-table :data="bids" :stripe="true">
          <el-table-column
            prop="id"
            label="Id">
          </el-table-column>
          <el-table-column
            prop="billId"
            label="Bill Id">
          </el-table-column>
          <el-table-column
            prop="bidder"
            label="Bidder">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="Amount">
          </el-table-column>
          <el-table-column
            label="">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="f-r" @click="showItemDetails(scope.row)">Approve</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="Item Details"
      v-if="selectedItem"
      :visible.sync="showDialog"
      width="40%">
      <div>
        <h2>Description</h2>
        <p>{{selectedItem.description}}</p>
        <el-row class="m-t item-attrs">
          <el-col :span="8" :offset="4">Class: <b>{{selectedItem.class}}</b></el-col>
          <el-col :span="8">Packaging Type: <b>{{selectedItem.type}}</b></el-col>
          <el-col :span="24"></el-col>
          <el-col :span="8" :offset="4">Quantity: <b>{{selectedItem.quantity}}</b></el-col>
          <el-col :span="8">Weight: <b>{{selectedItem.weight}}</b></el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import invoiceContractService from '../services/InvoiceContractService'

export default {
  name: 'InvoiceBidsComponent',
  props: ['bids', 'weight'],
  data () {
    return {
      selectedItem: null,
      showDialog: false
    }
  },
  mounted: function() {
    // TODO: use billId from selected bill
  },
  methods: {
    showItemDetails (item) {
      this.selectedItem = item
      this.showDialog = true
    }
  }
}
</script>
<style lang="scss">
.invoice-bids {
  .el-card__body {
    padding: 0;
  }

  .card-header {
    padding: 1rem;
    border-bottom: 1px solid #efefef;
  }

  .card-content {
    padding: 1rem;
  }

  .item-attrs {
    text-align: left;
  }
}
</style>