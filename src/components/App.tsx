import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RootState from '../reducers/reducers'
import { movies$ } from '../utils/movies'
import MovieList from './MovieList'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(4)
  const movies = useSelector((state: RootState) => state.movies)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const MovieList = await movies$ // Utilisez la promesse movies$
        console.log('MovieList:', MovieList)
        dispatch({
          type: 'SET_MOVIES',
          payload: MovieList
        })
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  const categories = [
    'All',
    ...new Set(movies.map((movie: Movie) => movie.category))
  ]

  const filteredMovies =
    selectedCategory === 'All'
      ? movies
      : movies.filter((movie: Movie) => movie.category === selectedCategory)

  const totalPages = Math.ceil(filteredMovies.length / cardsPerPage)

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const displayedMovies = filteredMovies.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-8 text-3xl font-bold">Ma Liste de Films</h1>
      <div className="flex">
        <select
          className="mx-3 mb-8 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="mb-8 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={cardsPerPage}
          onChange={(e) => setCardsPerPage(Number(e.target.value))}
        >
          {[4, 8, 12].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <MovieList movies={displayedMovies} />
      <div className="mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            className="
          mx-1 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600
          "
            key={page}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
