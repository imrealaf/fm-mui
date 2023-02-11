import { useState } from 'react'

const useSearch = (initialState = '') => {
  const [searchValue, setSearchValue] = useState(initialState)

  const onSearchChange = (data: { name: string; value: string }) => {
    const { value } = data
    setSearchValue(value)
  }

  const clearSearch = () => {
    setSearchValue('')
  }

  const submitSearch = () => {
    alert('search submitted')
  }

  return {
    searchValue,
    clearSearch,
    submitSearch,
    onSearchChange
  }
}

export default useSearch
