import invoices from '@/json/invoice.json'
import invoiceService from '@/services/InvoiceService'

const state = {
  invoices: []
}

const getters = {
  invoices: (state) => { return state.invoices; }
}

const mutations = {
  setInvoices: function (state, invoices) {
    state.invoices = invoices
  }
}

const actions = {
  fetchInvoices: function ({commit}, address) {
    return new Promise((resolve, reject) => {
      if (invoices) {
        commit('setInvoices', invoices)
        resolve(invoices)
      } else
        reject('No invoices found.')
    })
  },
  fetchInvoice: function ({state}, purchase_order) {
    return new Promise((resolve, reject) => {
      let targetInvoice = state.invoices.find(invoice => invoice.purchase_order === parseInt(purchase_order))
      if (targetInvoice) {
        if (!targetInvoice.total_weight)
          targetInvoice.total_weight = invoiceService.calculateWeight(targetInvoice)
        resolve(targetInvoice)
        // if (!targetInvoice.total_distance) {
        //   invoiceService.calculateDistance(targetInvoice).then(invoice => {
        //     targetInvoice = invoice
        //     resolve(targetInvoice)
        //   }).catch(invoice => {
        //     resolve(targetInvoice)
        //   });
        // } else {
        //   resolve(targetInvoice)
        // }
      } else {
        reject('Invoice not found.')
      }
    })
  },
  fetchInvoiceByBolId: function ({state}, bolID) {
    return new Promise((resolve, reject) => {
      let targetInvoice = state.invoices.find(invoice => invoice.id === parseInt(bolID))
      if (targetInvoice) {
        if (!targetInvoice.total_weight)
          targetInvoice.total_weight = invoiceService.calculateWeight(targetInvoice)
        resolve(targetInvoice)
        // if (!targetInvoice.total_distance) {
        //   invoiceService.calculateDistance(targetInvoice).then(invoice => {
        //     targetInvoice = invoice
        //     resolve(targetInvoice)
        //   }).catch(invoice => {
        //     resolve(targetInvoice)
        //   });
        // } else {
        //   resolve(targetInvoice)
        // }
      } else {
        reject('Invoice not found.')
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}