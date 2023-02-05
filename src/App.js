import Nav from "./components/Nav";
import Document from "./pages/Document";
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
        <Route index element={<Login/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="document/:id" element={<Document/>}/>
        
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
