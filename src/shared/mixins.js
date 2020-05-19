export default {
  data () {
    return {}
  },
  methods: {
    confirmDelete: function (message = '') {
      if (!message.length) {
        message = 'This will permanently delete the item. Continue?'
      }
      return this.$confirm(message, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
    },
    confirmAllowance: function (msg) {
      return this.$confirm(msg, 'Info', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      })
    },
    messageBox: function (title, msg) {
      return this.$alert(msg, title, {
        confirmButtonText: 'OK',
        center: true
      })
    },
    showError: function (message) {
      this.$notify.error({
        title: 'Error',
        message: message
      })
    },
    showSuccess: function (message) {
      this.$notify({
        title: 'Success',
        message: message,
        type: 'success'
      })
    },
    redirectToWebsite: function () {
      let host = window.location.host
      let protocol = window.location.protocol
      host = host.split('.')
      let env = host[host.length - 1]

      window.location.href = protocol + '//www.coinigniter.' + env
    }
  }
}
