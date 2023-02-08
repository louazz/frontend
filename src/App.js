import Nav from "./components/Nav";
import Document from "./pages/Document";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import { Worker } from '@react-pdf-viewer/core'
import View from './pages/View'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
    <BrowserRouter>
    <Routes>
    
      <Route path="/" element={ <Nav />}>
        <Route path="signup" element={<Signup/>}/>
        <Route index element={<Login/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="document/:id" element={<Document/>}/>
        <Route path="view/:id" element={<View />} />
      </Route>
     
    </Routes>
    </BrowserRouter>
     </Worker>
  );
}

export default App;
