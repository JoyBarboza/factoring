<template>
  <div class="bid-wrap">
    <el-card class="m-b t-l" v-loading="states.loading" element-loading-text="Please wait..." v-if="!states.success">
      <div class="card-header">
        <h3 class="m-0">Quote for this invoice</h3>
      </div>
      <div class="card-content">
        <div>
          <el-input placeholder="Amount" v-model="amount" class="m-b"></el-input>
          <el-button type="secondary" @click="broadcastAmount()">Submit</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="m-b t-l" v-loading="states.loading" element-loading-text="Please wait..." v-else>
      <div class="card-header">
        <h3 class="m-0">Your Quote</h3>
      </div>
      <div class="card-content">
        <div>
          <h1 class="amount">${{bid}} USD</h1>
          <el-row type="flex" justify="space-around">
            <el-button type="primary" @click="broadcastEdit()" class="half-button">Edit</el-button>
            <el-button type="danger" @click="broadcastRetract()" class="half-button f-r">Retract</el-button>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BidComponent',
  props: ['states', 'bid'],
  data () {
    return {
      amount: null
    }
  },
  mounted () {
    if (this.bid) {
      this.amount = this.bid
    }
  },
  methods: {
    broadcastAmount () {
      this.bid = this.amount
      this.$emit('onAmountSubmit', this.amount)
    },
    broadcastEdit () {
      this.bid = this.amount
      this.$emit('onAmountEdit')
    },
    broadcastRetract () {
      this.$emit('onBidRetract')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables.scss';

.bid-wrap {
  .el-card {
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.6);
    z-index: 10;
  }
  .el-card__body {
    padding: 0 !important;
  }

  .el-button {
    width: 100%;

    &.half-button {
      width: 45%;
     }
  }

  .amount {
    text-align: center;
    color: map_get($theme-colors, primary);
  }

  .card-header {
    padding: 0.8rem;
    border-bottom: 1px solid #efefef;
    color: #ffffff;
    background-color: map_get($theme-colors, primary_brand);
  }

  .card-content {
    padding: 1rem;

  .card-row {
    padding: 0.5rem 0rem;
    font-size: 0.9rem;

  &:first-child {
     padding-top: 0;
   }

  &:last-child {
     padding-bottom: 0;
   }
  }
  }
}
</style>