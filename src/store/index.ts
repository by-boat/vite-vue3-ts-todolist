import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      totle: 0,
      dones: 0,
    }
  },

  actions: {
    setTotle(newV) {
      this.totle = newV
    },
    setDones(newV) {
      this.dones = newV
    }
  }
})