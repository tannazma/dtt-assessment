import { defineStore } from 'pinia'
import { getHousesFromServerForList } from './Api-call'
import type { T_House } from '@/types/house'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return { houses: [] as T_House[] }
  },
  getters: {
    getHouseById(state) {
      return (houseId: number) => state.houses.find((house) => house.id === houseId)
    }
  },
  actions: {
    async getHousesFromServer() {
      this.houses = await getHousesFromServerForList()
    }
  }
})
