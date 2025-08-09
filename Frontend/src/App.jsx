import './App.css';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import ForgotPassword from "./pages/ForgotPassword"
import Home from './pages/Home';
import Layout from './Components/Layout';
import AddNotes from './pages/AddNotes';
import EditNotes from './pages/EditNotes';
import TokenExpire from "./Authentication/TokenExpire"
import { Routes,Route } from 'react-router-dom';


function App() {

  return (
    <>
    <TokenExpire />
     
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/signUp" element = {<SignUp />} />
          <Route path = "/forgotPassword/:email" element = {<ForgotPassword />}/>

          <Route element = {<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/addNotes" element={<AddNotes />} />
              <Route path="/editNotes/:id" element={<EditNotes />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
