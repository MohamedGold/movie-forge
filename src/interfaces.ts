import { MediaType } from './types'

export interface CustomComponentProps {
  children?: React.ReactNode
  className?: string
}

export interface Episode {
  id: number
  title: string
  overview: string
  airDate: string
  stillPath:string
  episodeNumber:number
}

export interface Season {
  id: number
  filmName:string
  name:string
  seasonNumber: number
  posterPath: string
  episodes: Episode[]
  airDate:string
}

export interface Film {
  id: number
  mediaType: MediaType
  title: string
  description: string
  posterPath: string
  coverPath: string
  genreIds: number[]
  seasons: Season[]
  rating?: number // تقييم الفيلم أو المسلسل
  genres?: number[] // قائمة التصنيفات
  views: number // عدد المشاهدات
  releaseDate: string
  genreNames?: string[] // Mapped genre names (optional field)
}

export interface Cast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

export interface Trailer {
  id: number
  key: string
}

export interface Genre {
  id: number
  name: string
}


