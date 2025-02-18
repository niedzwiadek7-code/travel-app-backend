type PhotoFormat = {
  id: number
  url: string
  isShared: boolean
}

export interface RatingFormat {
  elementTravelId: number
  text: string
  rating: number
  photos: PhotoFormat[]
}
