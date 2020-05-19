<template>
  <el-card class="filter-wrap m-b">
    <div class="card-header">
      <h4 class="filter-header">Filter by Status</h4>
    </div>
    <div class="card-content">
      <el-radio v-model="status" label="all" class="filter-options" @click="onFilterUpdate">All</el-radio>
      <el-radio v-model="status" label="open" class="filter-options" @click="onFilterUpdate">Open</el-radio>
      <el-radio v-model="status" label="progress" class="filter-options" @click="onFilterUpdate">In Progress</el-radio>
      <el-radio v-model="status" label="completed" class="filter-options" @click="onFilterUpdate">Completed</el-radio>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'StatusFilterComponent',
  props: ['filterValue', 'onFilterChange'],
  data: function () {
    return {
      status: ''
    }
  },
  watch: {
    filterValue: function (newVal) {
      this.status = newVal
    }
  },
  methods: {
    onFilterUpdate() {
      this.$emit('onFilterChange', this.status)
    }
  }
}
</script>