import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3002/api/books?q=${query}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="book-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books?.map((book) => (
            <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{book.volumeInfo.title}</h3>
                <p className="text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-500">{book.volumeInfo.publishedDate}</p>
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-500 hover:text-blue-700"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
