import { Routes,Route } from 'react-router-dom';

import Editer from './Editer';
import Dashboard from './Dashboard';
import Home from './Home';








const App = () => {
  return (
    <>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path = "/editor/:id" element={<Editer/>} />
      </Routes>
    
    </>
  )


  
};

export default App;
