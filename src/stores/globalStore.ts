import { defineStore } from 'pinia'
import { getHousesFromServerForList } from './Api-call'
import type { T_House } from '@/types/house'
import { deleteHouseInList } from '@/stores/Api-call'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      houses: [] as T_House[],
      isDeleteDialogOpen: false,
      houseToDeleteId: undefined as number | undefined
    }
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
    },
    hideDeleteDialog() {
      this.isDeleteDialogOpen = false
    },
    showDeleteDialog() {
      this.isDeleteDialogOpen = true
    },
    async deleteHouse() {
      if (this.houseToDeleteId === undefined) return

      await deleteHouseInList(this.houseToDeleteId)
      this.hideDeleteDialog()
      this.getHousesFromServer()
    }
  }
})
