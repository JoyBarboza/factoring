<template>
    <div>
        <GmapAutocomplete @place_changed="setPlace" :placeholder="placeholder_text" :options="options" class="el-input__inner" id="autocomplete-wrapper"></GmapAutocomplete>
    </div>
</template>

<script>
export default {
  name: 'PlacesSearch',
  data () {
    return {
      location: null,
      searchBox: null,
      options: {
//        types: ['(regions)']
      },
      inputElement: null
    }
  },
  props: [ 'value', 'placeholder_text' ],
  mounted: function () {
    this.location = this.value
    this.inputElement = document.getElementById('autocomplete-wrapper')
    this.inputElement.addEventListener('blur', () => {
      if (this.inputElement.value === '') {
        this.$emit('input', {})
      }
    })
  },
  beforeDestroy: function () {
    this.inputElement.removeEventListener('blur', function () {
    }, false)
  },
  watch: {
    value: function (newVal, oldVal) {
      this.location = newVal
    }
  },
  methods: {
    setPlace: function (place) {
      this.$emit('input', place.formatted_address)
    }
  }
}
</script>

<style scoped>

</style>
