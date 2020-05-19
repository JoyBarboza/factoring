<template>
  <el-card class="filter-wrap m-b">
    <div class="card-header">
      <h4 class="filter-header">Order By Date</h4>
    </div>
    <div class="card-content">
      <el-radio v-model="date" label="newest" class="filter-options" @click="onFilterUpdate">Newest</el-radio>
      <el-radio v-model="date" label="oldest" class="filter-options" @click="onFilterUpdate">Oldest</el-radio>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'DataFilterComponent',
  props: ['filterValue', 'onFilterChange'],
  data: function () {
    return {
      date: ''
    }
  },
  watch: {
    filterValue: function (newVal) {
      this.date = newVal
    }
  },
  methods: {
    onFilterUpdate() {
      this.$emit('onFilterChange', this.date)
    }
  }
}
</script>
<style scoped lang="scss">
.filter-wrap{
  .el-card{
    padding: 0px !important;
  }
  
  .el-card__body{
    padding: 0;
  }

  .card-header{
    padding: 0.8rem;
    color: #ffffff;
    background-color: #002d7b;
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