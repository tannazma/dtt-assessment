import { defineStore } from 'pinia'
import { getHousesFromServerForList } from './Api-call'
import type { T_House } from '@/types/house'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return { houses: [] as T_House[] }
  },
  actions: {
    async getHousesFromSerever() {
      this.houses = await getHousesFromServerForList()
    }
  }
})
