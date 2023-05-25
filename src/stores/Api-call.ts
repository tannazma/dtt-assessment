import { apiKey } from '@/stores/Api-key'

const headers = {
  'X-Api-Key': apiKey
}

export async function sendImage(houseId: number, picture: any) {
  if (!picture) {
    return
  }
  const formData = new FormData()

  formData.append('image', picture)
  const response = await fetch('https://api.intern.d-tt.nl/api/houses/' + houseId + '/upload', {
    method: 'POST',
    headers: headers,
    body: formData
  })
  console.log(response)
}

export async function sendImageForEditPage(houseId: number, form_data: any) {
  fetch('https://api.intern.d-tt.nl/api/houses/' + houseId, {
    method: 'POST',
    headers: headers,
    body: form_data
  })
}

export async function sendImageForCreateHouse(form_data: any) {
  const response = fetch('https://api.intern.d-tt.nl/api/houses', {
    method: 'POST',
    headers: headers,
    body: form_data
  })
  return await (await response).json()
}
