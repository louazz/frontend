import Nav from "./components/Nav";
import Doc from "./pages/Doc";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Nav />}>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="document/:id" element={<Doc/>}/>
        <Route path="*" element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
