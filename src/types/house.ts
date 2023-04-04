export type T_House = {
  id: number
  image: string
  price: number
  rooms: { bedrooms: number; bathrooms: number }
  size: number
  description: string
  location: { street: string; city: string; zip: string }
  createdAt: string
  constructionYear: number
  hasGarage: boolean
  madeByMe: boolean
}
