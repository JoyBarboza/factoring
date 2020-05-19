<template>
  <el-card class="filter-wrap m-b">
    <div class="card-header">
      <h4 class="filter-header">Show Invoices</h4>
    </div>
    <div class="card-content">
      <el-radio v-model="show" label="all" class="filter-options" @click="onFilterUpdate">All</el-radio>
      <el-radio v-model="show" label="market_place" class="filter-options" @click="onFilterUpdate">Market Place</el-radio>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'ShowInvoicesFilterComponent',
  props: ['filterValue', 'onFilterChange'],
  data: function () {
    return {
      show: ''
    }
  },
  watch: {
    filterValue: function (newVal) {
      this.show = newVal
      console.log('Show: ', this.show)
    }
  },
  methods: {
    onFilterUpdate() {
      this.$emit('onFilterChange', this.show)
    }
  }
}
</script>