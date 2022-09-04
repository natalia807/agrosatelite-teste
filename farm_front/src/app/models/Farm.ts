import { Owner } from './Owner'
export interface Farm {
  name: string
  geometry?: any
  area?: number
  centroid?: number[]
  creation_date?: Date
  owner?: Owner
  owner_id?: number
  id?: number
}
