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
    },
    filterHouses(state) {
      return (searchText: string) =>
        state.houses.filter(
          (h) =>
            h.description.toLowerCase().includes(searchText.toLowerCase()) ||
            h.location.street.toLowerCase().includes(searchText.toLowerCase()) ||
            h.location.city.toLowerCase().includes(searchText.toLowerCase()) ||
            h.location.zip.toLowerCase().includes(searchText.toLowerCase())
        )
    }
  },
  actions: {
    async getHousesFromServer() {
      this.houses = await getHousesFromServerForList()
    }
  }
})
