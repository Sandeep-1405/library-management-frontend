import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateStudent from './Components/CreateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Students from './Components/Students';
import UpdateStudent from './Components/UpdateStudent';
import Books from './Components/Books';
import CreateBook from './Components/CreareBook';
import UpdateBook from './Components/UpdateBook';
import Library from './Components/Library';
import Add from './Components/Add';
import UpdateLibrary from './Components/UpdateLibrary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>} />

      {/* Students */}
      <Route path='/students' element={<Students/>} />
      <Route path='/add-student' element={<CreateStudent/>} />
      <Route path= '/student/edit/:id' element={<UpdateStudent/>} />

      {/* Books */}
      <Route path='/books' element={<Books/>} />
      <Route path='/add-book' element={<CreateBook/>} />
      <Route path= '/book/edit/:id' element={<UpdateBook/>} />

      {/* Library */}
      <Route path='/library' element={<Library/>} />
      <Route path='/add' element={<Add/>} />
      <Route path= '/library/edit/:id' element={<UpdateLibrary/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
