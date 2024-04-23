import { Movie } from '@/reducers/reducers'

export const DELETE_MOVIE = 'DELETE_MOVIE'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const TOGGLE_DISLIKE = 'TOGGLE_DISLIKE'
export const SET_MOVIES = 'SET_MOVIES'

export interface DeleteMovieAction {
  type: typeof DELETE_MOVIE
  payload: { movieId: string }
}

export interface ToggleLikeAction {
  type: typeof TOGGLE_LIKE
  payload: {
    movieId: string
    likeStatus: 'like' | null
  }
}

export interface ToggleDislikeAction {
  type: typeof TOGGLE_DISLIKE
  payload: {
    movieId: string
    dislikeStatus: 'dislike' | null
  }
}

export interface SetMoviesAction {
  type: typeof SET_MOVIES
  payload: Movie[]
}

export const deleteMovie = (movieId: string): DeleteMovieAction => ({
  type: DELETE_MOVIE,
  payload: { movieId }
})

export const toggleLike = (
  movieId: string,
  likeStatus: 'like' | null
): ToggleLikeAction => ({
  type: TOGGLE_LIKE,
  payload: { movieId, likeStatus }
})

export const toggleDislike = (
  movieId: string,
  dislikeStatus: 'dislike' | null
): ToggleDislikeAction => ({
  type: TOGGLE_DISLIKE,
  payload: { movieId, dislikeStatus }
})

export const setMovies = (movies: Movie[]): SetMoviesAction => ({
  type: SET_MOVIES,
  payload: movies
})

export type MovieActionTypes =
  | DeleteMovieAction
  | SetMoviesAction
  | ToggleLikeAction
  | ToggleDislikeAction
