import { apiKey } from '@/stores/Api-key'


export async function sendImage(houseId: number, picture: any) {
    if (!picture) {
      return
    }
    const formData = new FormData()
    const headers = {
        'X-Api-Key': apiKey
      }
  
    formData.append('image', picture)
    const response = await fetch('https://api.intern.d-tt.nl/api/houses/' + houseId + '/upload', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    console.log(response)
  }