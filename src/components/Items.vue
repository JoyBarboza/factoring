<template>
  <div class="invoice-items">
    <div class="t-l">
      <div class="card-header">
        <!-- <h3 class="m-0">Items</h3> -->
<!--         <small class="gray">Total {{items && items.length ? items.length : 0}} Items</small><small class="gray" v-if="weight"> - {{weight}} lbs.</small>
 -->      </div>
      <div class="card-content">
        <el-table :data="items" :stripe="true">
          <el-table-column
            label="Name">
            <template slot-scope="scope">
              Item Name
            </template>
          </el-table-column>
          <el-table-column
            prop="class"
            label="Class">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Quantity">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="Weight">
          </el-table-column>
          <el-table-column
            prop="type"
            label="Packaging Type">
          </el-table-column>
          <el-table-column
            label="">
            <template slot-scope="scope">
              <div class="t-c">
                <el-tooltip class="item" effect="dark" content="View Item" placement="top">
                  <i class="far fa-eye" @click="showItemDetails(scope.row)"></i>
                </el-tooltip>
              </div>
<!--               <el-button type="primary" size="mini" class="f-r" @click="showItemDetails(scope.row)">View</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      v-if="selectedItem"
      :visible.sync="showDialog"
      width="40%">
      <div class="t-l">
        <h2 class="t-l">Item Details</h2>
        <div><b>Item Name:</b> Item name goes here</div>
        <p>{{selectedItem.description}}</p>
        <el-row class="m-t item-attrs">
          <el-col :span="6" class="rb">Class: <b>{{selectedItem.class}}</b></el-col>
          <el-col :span="8" :offset="2">Packaging Type: <b>{{selectedItem.type}}</b></el-col>
          <el-col :span="24" class="p-0"></el-col>
          <el-col :span="6" class="rb">Quantity: <b>{{selectedItem.quantity}}</b></el-col>
          <el-col :span="8" :offset="2">Weight: <b>{{selectedItem.weight}}</b></el-col>
        </el-row>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">Close</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'InvoiceItemComponent',
  props: ['items', 'weight'],
  data () {
    return {
      selectedItem: null,
      showDialog: false
    }
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
.invoice-items {
  .el-card__body {
    padding: 0;
  }

  .card-header {
    padding: 0px;
    border-bottom: 1px solid #efefef;
  }

  .card-content {
    padding: 0px;
  }

  .item-attrs {
    text-align: left;
  }
  .el-table.el-table--striped{
    border: 1px solid #ebeef5;
  }
  .el-table .cell {
    padding-left: 15px;
  }
  i{
    cursor: pointer;
    font-size: 1.2rem;
    color: #0166cc;
  }
  .el-dialog__wrapper{
    .el-dialog{
      width: 30% !important;
      .el-row{
        .el-col{
          padding: 5px 0;
        }
        .el-col.rb{
          border-right: 1px solid #606266;
        }
      }
      .el-dialog__body{
        padding-top: 0px;
        padding: 42px 30px;
        p{
          margin-top: 1.17em;
        }
        h2{
          margin-top: 0px;
        }
      }
      .el-dialog__header{
        padding: 0px;
      }
      .el-dialog__headerbtn{
        top:10px;
        right: 10px;
        /*background: red;*/
        /*color: #fff;*/
        font-weight: bold;
        border-radius: 37rem;
        width: 32px;
        height: 32px;
        i{
          /*color: #fff;*/
          font-weight: bolder;
        }
      }
    }
  }
}
</style>