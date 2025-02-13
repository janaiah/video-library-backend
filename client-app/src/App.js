
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VideoHome from './components/VideoHome';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AdminAddVideo from './components/AdminAddVideo';
import AdminEditVideo from './components/AdminEditVideo';
import AdminDeleteVideo from './components/AdminDeleteVideo';
import UserRegistration from './components/UserRegistration';
import Categories from './components/Categories';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="body-background">
      <div className='bg-shade'>
      <h1 className='text-center text-white  pt-3'>Technologies Video Library</h1>
      <BrowserRouter>
      <header className='d-flex justify-content-between bg-light p-2 m-2'>
        <h2>Video Library</h2>
        <nav>
          <span>Home</span>
          <span className='mx-2'>AboutUs</span>
          <span>Contact</span>
        </nav>
      </header>
      <Routes>
      <Route path='/' element={<VideoHome/>} />
      <Route path='admin-login' element={<AdminLogin/>} />
      <Route path='user-login' element={<UserLogin/>} />
      <Route path='admin-dash' element={<AdminDashboard/>}/>
      <Route path='add-video' element={<AdminAddVideo/>} />
      <Route path='edit-video/:id' element={<AdminEditVideo/>} />
      <Route path='delete-video/:id' element={<AdminDeleteVideo/>}/>
      <Route path='categories' element={<Categories/>} />
      <Route path='users-list' element={<UsersList/>} />
      <Route path='user-dash' element={<UserDashboard/>}/>
      <Route path='user-registration' element={<UserRegistration/>}/>
      <Route path='*' element={<h1 className='text-center text-white'>Page Not Found</h1>} />

      </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
