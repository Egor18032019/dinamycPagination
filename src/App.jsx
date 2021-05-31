import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([])
  const [fetching, setFetching] = useState(true)
  const [currentPage, setCurrentage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)


  
  const scrollHandler = (e) => {
    console.log("totalCount ", totalCount)

    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 222
      && photos.length < totalCount) {
      console.log("scrollHandler")
      setFetching(true)
    
    }
  }

  useEffect(() => {
    console.log("addEventListener ")
    document.addEventListener("scroll", scrollHandler) // и незабываем удалить этот слушатель
    return function () {
      console.log("removeEventListener ")
      document.removeEventListener("scroll",  scrollHandler)
    }
  }//,[]убираем массив зависимостей так как реакт против
  )


  useEffect(
    () => {
      if (fetching) {
 
        axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
          .then(respons => {
            setCurrentage(prevState => prevState + 1)
            setPhotos([...photos, ...respons.data])
            setTotalCount(respons.headers[`x-total-count`])

          }) // создаем новый массив в него развораичаем старый масссив и добавляем новый массив разворачиая его
          .finally(() => {
            setFetching(false)
          })
      }
    }//, [fetching] убираем массив зависимостей так как реакт против
  )




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Динамическая пагинация <br></br>
         (подгрузка страниц)
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="page-list">
        <h2>Список страниц</h2>
        <ul>
          {photos.map(
            (photo) => {
              return (
                <li className="page" key={photo.id + photo.title}>

                  <div className="page-id">{photo.id} {photo.albumId}</div>
                  <div className="page-title">{photo.title}</div>
                  <img src={photo.thumbnailUrl} alt="page icon"></img>
                </li>
              )
            }
          )

          }
        </ul>
      </div>
    </div>
  );
}

export default App;
