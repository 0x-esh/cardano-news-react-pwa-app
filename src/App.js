import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const key = process.env.REACT_APP_API_KEY;
  const url = "https://bing-news-search1.p.rapidapi.com/news/search?q=cardano&setLang=pt-br&cc=br&freshness=Day&originalImg=true&textFormat=Raw&safeSearch=Off";
  const options = {
    "method": "GET",
    "headers": {
      "x-bingapis-sdk": "true",
      "x-rapidapi-key": key,
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
    }
  };
  
  const [news, setNews] = useState();
  
  const fetchApi = async () => {
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    setNews(responseJSON.value);
  }
  
  useEffect(() => {
    fetchApi();
  }, []);

  return (

    <span className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
      <div className="flex flex-wrap justify-between pt-12 -mx-6">
        {
          !news
            ?
            <img src={logo} className="App-logo" alt="logo" />
            :
            news.length > 0 ?
              news.map((news, index) => {

                if (index === 0) {
                  return (
                    <div className="flex h-full bg-white rounded overflow-hidden shadow-lg" key={index}>
                      <span className="flex flex-wrap no-underline hover:no-underline">
                        <div className="w-full md:w-2/3 rounded-t">
                          {
                            news.image
                            ? <img src={news.image.contentUrl} className="h-full w-full shadow" alt="" /> 
                            : <img src={logo} className="h-full w-full shadow" alt="" />
                          }                      
                        </div>
                        <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
                          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                            <p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">{news.provider[0].name}</p>
                            <div className="w-full font-bold text-xl text-gray-900 px-6">{news.name}</div>
                            <p className="text-gray-800 font-serif text-base px-6 mb-5">{news.description}</p>
                          </div>
                          <div
                            className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                            <div className="flex items-center justify-between">
                              <p className="text-gray-600 text-xs md:text-sm">{news.datePublished}</p>
                              <p className="text-gray-600 text-xs md:text-sm"><a href={news.url} target="_blank" rel="noreferrer" className="url">Saiba mais</a></p>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  )
                } else {
                  return (
                    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink" key={index}>
                      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                        <span className="flex flex-wrap no-underline hover:no-underline">
                          {
                            news.image
                            ? <img src={news.image.contentUrl} className="h-full w-full shadow" alt="" /> 
                            : <img src={logo} className="h-full w-full shadow" alt="" />
                          }
                          <p className="w-full text-gray-600 text-xs md:text-sm px-6">{news.provider[0].name}</p>
                          <div className="w-full font-bold text-xl text-gray-900 px-6">{news.name}
                          </div>
                          <p className="text-gray-800 font-serif text-base px-6 mb-5">
                            {news.description}
                          </p>
                        </span>
                      </div>
                      <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 text-xs md:text-sm">{news.datePublished}</p>
                          <p className="text-gray-600 text-xs md:text-sm"><a href={news.url} target="_blank" rel="noreferrer" className="url">Saiba mais</a></p>
                        </div>
                      </div>
                    </div>
                  )
                }
              }) :
              <figure>
                <img src={logo} className="App-logo" alt="logo" />
                <figcaption>Sem notícias em português...</figcaption>
              </figure>
        }
      </div>
    </span>
  );

}

export default App;
