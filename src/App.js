import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [showAuthorButton, setShowAuthorButton] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = () => {
    axios.get('https://api.quotable.io/quotes')
      .then(response => {
        setQuotes(response.data.results);
        setCurrentQuote(response.data.results[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setAuthorQuotes([]);
    setShowAuthorButton(true); // Hiển thị lại nút tác giả khi random trích dẫn mới
  };

  const showQuotesByAuthor = (authorName) => {
    const authorQuotes = quotes.filter(quote => quote.author === authorName);
    setCurrentQuote(null);
    setAuthorQuotes(authorQuotes);
    setShowAuthorButton(false); // Ẩn nút tác giả khi hiển thị danh sách trích dẫn của tác giả
  };

  return (
    <div className='big_container'>
      <button className="btn btn-primary mt-3 random" onClick={randomQuote}>
        random 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
          <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182a.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
      </button>
      <div className="container mt-5">
          <div className="blockquote">
            <p>{currentQuote ? currentQuote.content : ''}</p>
          </div>
          {showAuthorButton && (
            <div className='blockauthor'>
              <button className='blockauthor_button' onClick={() => showQuotesByAuthor(currentQuote.author)}>
                {currentQuote.author}
                <div className='d-flex justify-content-between'>
                  <p className='block_tags'>{currentQuote.tags ? currentQuote.tags.join(", ") : ""}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </div>
              </button>
            </div>
          )}
          <div className='allQuotes'>
            {authorQuotes.map((quote, index) => (
              <div key={index} className='blockquote'>
                <p className='my-5'>"{quote.content}"</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default App;
