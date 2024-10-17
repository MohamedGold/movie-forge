import { Cast, Episode, Film, Genre, Season, Trailer } from '@/interfaces'
import { MediaType } from '@/types'
import { formatResult } from '@/utilts'
import axios, { AxiosResponse } from 'axios'


const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL, // Updated variable name
})

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, // Updated variable name
    },
  }
})



export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/trending/${mediaType}/week`)

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error('Error fetching trendings:', error)
  }

  return []
}

export const getInTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/movie/now_playing`)

    return data.results.map((val) => formatResult(val, 'movie'))
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getPopular = async (
  mediaType: MediaType,
  page = 1
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/${mediaType}/popular`, {
      params: {
        page,
      },
    })

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getTopRated = async (
  mediaType: MediaType,
  page = 1,
  genreId?: string // genreId is optional
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    // Use /discover endpoint only if a genreId is specified
    const endpoint = genreId
      ? `/discover/${mediaType}`
      : `/${mediaType}/top_rated`

    // Set parameters accordingly
    const params: { page: number; with_genres?: string; sort_by?: string } = {
      page,
    }

    if (genreId) {
      // Apply the genre filter with proper sorting for top-rated
      params.with_genres = genreId
      params.sort_by = 'vote_average.desc' // Sort by vote_average to fetch top-rated results
      params['vote_count.gte'] = 200 // Adding a threshold to ensure the results are actually "top-rated"
    }

    const { data } = await axiosClient.get<{
      results: unknown[]
      total_pages: number
    }>(endpoint, {
      params,
    })

    // Map the genre names correctly for TV shows
    const genreMapping: { [key: string]: string } = {
      Action: 'Action & Adventure',
      'Science Fiction': 'Sci-Fi & Fantasy',
    }

    const films = data.results.map((val) => {
      const film = formatResult(val, mediaType)
      // Add genre name mapping logic for TV shows
      if (mediaType === 'tv' && film.genreIds) {
        film.genreNames = film.genreIds.map((genreId) => {
          return genreMapping[genreId] || `Genre ${genreId}`
        })
      }

      return film
    })

    return {
      films,
      totalPages: data.total_pages,
    }
  } catch (error) {
    console.error('Error fetching top-rated:', error)
    return {
      films: [],
      totalPages: 0,
    }
  }
}

export const search = async (
  query: string,
  page = 1
): Promise<{
  totalPages:number
  totalResults: number
  films: Film[]
}> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        total_pages: number
        total_results: number
        results: unknown[]
      }>
    >(`/search/multi`, {
      params: {
        query,
        page,
      },
    })

    return {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      films: data.results.map((val) => formatResult(val)),
    }
  } catch (error) {
    console.error(error)
  }

  return {
    totalPages:0,
    totalResults: 0,
    films: [],
  }
}

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        genres: Genre[]
      }>
    >(`/genre/${mediaType}/list`)

    const genreMapping: { [key: string]: string } = {
      Action: 'Action & Adventure',
      'Science Fiction': 'Sci-Fi & Fantasy',
    }

    if (mediaType === 'tv') {
      return data.genres.map((genre) => ({
        ...genre,
        name: genreMapping[genre.name] || genre.name,
      }))
    }

    return data.genres
  } catch (error) {
    console.error('Failed to fetch genres:', error)
    throw error // Re-throw the error after logging it
  }
}
export const getDetail = async (
  mediaType: MediaType,
  id: number
): Promise<null | Film> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}`)

    return formatResult(data, mediaType)
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getCasts = async (
  mediaType: MediaType,
  id: number
): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        cast: any[]
      }>
    >(`/${mediaType}/${id}/credits`)

    return (
      data.cast.map((cast) => ({
        id: cast.id,
        characterName: cast.character,
        name: cast.name,
        profilePath: cast.profile_path,
      })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getTrailers = async (
  mediaType: MediaType,
  id: number
): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: any[]
      }>
    >(`/${mediaType}/${id}/videos`)

    return (
      data.results
        .filter(
          (res) =>
            res.site.toLowerCase() === 'youtube' &&
            (res.name.toLowerCase().includes('official trailer') ||
              res.name.toLowerCase().includes('trailer') ||
              res.name.toLowerCase().includes('season 1 trailer'))
        )

        .map((res) => ({
          id: res.id,
          key: res.key,
        })) ?? []
    )
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getRecommendations = async (
  mediaType: MediaType,
  id: number
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/${mediaType}/${id}/recommendations`)

    return data.results.map((val) => formatResult(val, mediaType))
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getSeason = async (
  tvId: number,
  seasonNumber: number
): Promise<Season | null> => {
  try {
    const { data } = await axiosClient.get<any, any>(
      `/tv/${tvId}/season/${seasonNumber}`
    )

    const film = await getDetail('tv', tvId)

    return {
      id: data.id,
      filmName: film?.title || '',
      name: data.name,
      posterPath: data.poster_path,
      seasonNumber: data.season_number,
      airDate: data.air_date,
      episodes: data.episodes.map(
        (episode: any) =>
          ({
            id: episode.id,
            title: episode.name,
            overview: episode.overview,
            airDate: episode.air_date,
            stillPath: episode.still_path,
            episodeNumber: episode.episode_number,
          } satisfies Episode)
      ),
    }
  } catch (error) {
    console.error(error)
  }

  return null
}


export const discover = async (
  mediaType: MediaType,
  page = 1,
  genreId?: string // Add genreId as an optional parameter
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        total_pages: number
        results: unknown[]
      }>
    >(`/discover/${mediaType}`, {
      params: {
        page,
        with_genres: genreId, // Pass genre ID to the API
      },
    })

    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages,
    }
  } catch (error) {
    console.error('Error fetching :', error)
  }

  return {
    films: [],
    totalPages: 0,
  }
}

