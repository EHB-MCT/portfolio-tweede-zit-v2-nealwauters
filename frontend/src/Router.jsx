import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Questions from './pages/Questions'
import QuestionDetails from './pages/QuestionDetails'
import User from './pages/User'

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Questions />} />
    <Route path='/question-details' element={<QuestionDetails />} />
    <Route path='/user' element={<User />} />
   </Routes>
   </BrowserRouter>
  )
}

export default Router