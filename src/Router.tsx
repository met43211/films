import {Routes, Route} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import MainPage from './pages/MainPage'
import SearchResultsPage from './pages/SearchResultsPage'
import FilmPage from './pages/FilmPage'
function Router() {
  return (
    <Routes>
      <Route path={'/films/'} element={<MainPage/>}></Route>
      <Route path={'/searchResults/:keyWord'} element={<SearchResultsPage/>}></Route>
      <Route path="/films/:id" element={<FilmPage />} />
      <Route path={'/films/*'} element={<ErrorPage/>}></Route>
    </Routes>
  )
}

export default Router
