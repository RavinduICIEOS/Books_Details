import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';

const App = () => {
  const [query, setQuery] = useState('react');

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <BookList query={query} />
    </div>
  );
};

export default App;
