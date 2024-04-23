/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteMovie, toggleDislike, toggleLike } from '../actions/actions'
import { Movie } from '../reducers/reducers'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch()
  const [likeStatus, setLikeStatus] = useState<'like' | null>(movie.liked)
  const [dislikeStatus, setDislikeStatus] = useState<'dislike' | null>(
    movie.disliked
  )

  useEffect(() => {
    setLikeStatus(movie.liked)
    setDislikeStatus(movie.disliked)
  }, [movie.liked, movie.disliked])

  const handleLike = () => {
    const newLikeStatus = likeStatus === 'like' ? null : 'like'
    setLikeStatus(newLikeStatus)
    dispatch(toggleLike(movie.id, newLikeStatus))
  }

  const handleDislike = () => {
    const newDislikeStatus = dislikeStatus === 'dislike' ? null : 'dislike'
    setDislikeStatus(newDislikeStatus)
    dispatch(toggleDislike(movie.id, newDislikeStatus))
  }

  const handleDelete = () => {
    dispatch(deleteMovie(movie.id))
  }

  return (
    <div className="w-64 overflow-hidden rounded-lg bg-white shadow-lg">
      <img
        src={`https://via.placeholder.com/150`}
        alt={movie.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">{movie.title}</h2>
        <p className="mb-2 text-gray-700">Category: {movie.category}</p>
        <div className="mb-4 flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-600 focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div className="flex">
            <button
              className={`focus:shadow-outline mr-2 rounded px-2 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none ${
                likeStatus === 'like' ? 'bg-blue-500' : 'bg-gray-500'
              }`}
              onClick={handleLike}
            >
              Like
            </button>
            <button
              className={`focus:shadow-outline rounded px-2 py-1 font-bold text-white hover:bg-red-600 focus:outline-none ${
                dislikeStatus === 'dislike' ? 'bg-red-500' : 'bg-gray-500'
              }`}
              onClick={handleDislike}
            >
              Dislike
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Likes: {movie.likes}</p>
          <p className="text-gray-700">Dislikes: {movie.dislikes}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
