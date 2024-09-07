import { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import "./trending.css";

interface Book {
  title: string;
  author: string;
  coverImage: string;
  readOnlineURL: string;
  downloadURL: string;
  isTrending: boolean;
}

const TrendingBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const response = await fetch("http://localhost:6005/api/books");
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
    fetchTrendingBooks();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredBooks.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
    setCurrentIndex(0);
  };

  const noBooksFound = filteredBooks.length === 0;
  const currentBook = filteredBooks[currentIndex] || {}; // Handle empty case

  return (
    <div className="trending-books">
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="books">
        {noBooksFound ? (
          <p>No books found.</p>
        ) : (
          <>
            <button onClick={handlePrevClick} className="arrow-button">
              <IonIcon icon={arrowBackOutline} />
            </button>

            <div className="book-display">
              <h1>Trending Books</h1>
              {currentBook.coverImage && (
                <img
                  src={currentBook.coverImage}
                  alt={`${currentBook.title} cover`}
                  className="book-cover"
                />
              )}
              <h3 className="book-title">{currentBook.title}</h3>
              <p className="book-author">by {currentBook.author}</p>
              <div className="book-actions">
                {currentBook.readOnlineURL && (
                  <a
                    href={currentBook.readOnlineURL}
                    className="btn read-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Online
                  </a>
                )}
                {currentBook.downloadURL && (
                  <a
                    href={currentBook.downloadURL}
                    className="btn download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>

            <button onClick={handleNextClick} className="arrow-button">
              <IonIcon icon={arrowForwardOutline} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingBooks;
