import axios, { AxiosError } from 'axios'
import { DataManagementPlan } from './apiTypes'
import { SaveItemProps } from './DmpComponent'

export type APIResponseType = {
  status: number
  requested: string
  requested_at: string
  total_items: number
  page: number
  per_page: number
  items: DataManagementPlan[]
  errors: []
}

// API throws a CORS error, and so I'm using a browser extension to bypass it
const dmpAxios = axios.create({
  baseURL: 'https://api.dmphub.uc3stg.cdlib.net/dmps/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const fetchDmpRecordsList = async (dmpId: string): Promise<DataManagementPlan[]> => {
  try {
    const response = await dmpAxios.get<APIResponseType>(dmpId)
    const { items } = response?.data || {}
    return items || []
  } catch (error) {
    const e = error as AxiosError
    if (e.response) {
      // Handle API errors
      console.error('API Error', e.response.data)
      throw new Error(`API Error: ${e.response.status}`)
    } else if (e.request) {
      // Handle network errors
      console.error('Network Error', e.request)
      throw new Error('Network Error')
    } else {
      // Handle other errors
      console.error('Error', e.message)
      throw new Error(`Error: ${e.message}`)
    }
  }
}

export const saveDmpRecord = async (id: string, payload: SaveItemProps) => {
  const { title, contactEmail, opportunityId, description } = payload
  console.info('saveItem', id, { title, contactEmail, opportunityId, description })
}
