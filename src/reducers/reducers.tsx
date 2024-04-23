import {
  DELETE_MOVIE,
  DeleteMovieAction,
  SET_MOVIES,
  SetMoviesAction,
  TOGGLE_DISLIKE,
  TOGGLE_LIKE,
  ToggleDislikeAction,
  ToggleLikeAction
} from '../actions/actions'

export interface Movie {
  dislikeStatus: any
  likeStatus: any
  id: string
  title: string
  category: string
  likes: number
  dislikes: number
  liked: 'like' | null
  disliked: 'dislike' | null
}

export interface MovieState {
  movies: Movie[]
}

type MovieAction =
  | ToggleLikeAction
  | ToggleDislikeAction
  | SetMoviesAction
  | DeleteMovieAction

const initialState: MovieState = {
  movies: []
}

const movieReducer = (
  state = initialState,
  action: MovieAction
): MovieState => {
  switch (action.type) {
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(
          (movie) => movie.id !== action.payload.movieId
        )
      }
    case TOGGLE_LIKE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.movieId
            ? {
                ...movie,
                liked: movie.liked === 'like' ? null : 'like',
                dislikes:
                  movie.liked === 'like'
                    ? movie.dislikes
                    : movie.disliked === 'dislike'
                    ? Math.max(movie.dislikes - 1, 0)
                    : movie.dislikes,
                disliked: movie.liked === 'like' ? movie.disliked : null,
                likes:
                  movie.liked === 'like'
                    ? Math.max(movie.likes - 1, 0)
                    : movie.likes + 1,
                dislikeStatus:
                  movie.liked === 'like' ? movie.dislikeStatus : null,
                likeStatus: movie.liked === 'like' ? null : 'like'
              }
            : movie
        )
      }

    case TOGGLE_DISLIKE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.movieId
            ? {
                ...movie,
                disliked: movie.disliked === 'dislike' ? null : 'dislike',
                likes:
                  movie.disliked === 'dislike'
                    ? movie.likes
                    : movie.liked === 'like'
                    ? Math.max(movie.likes - 1, 0)
                    : movie.likes,
                liked: movie.disliked === 'dislike' ? movie.liked : null,
                dislikes:
                  movie.disliked === 'dislike'
                    ? Math.max(movie.dislikes - 1, 0)
                    : movie.dislikes + 1,
                likeStatus:
                  movie.disliked === 'dislike' ? movie.likeStatus : null,
                dislikeStatus: movie.disliked === 'dislike' ? null : 'dislike'
              }
            : movie
        )
      }

    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state
  }
}

export default movieReducer
