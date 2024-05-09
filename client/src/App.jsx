import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CreateDeck from './views/CreateDeck';
import DeckList from './views/DeckList'
import ViewDeck from "./views/ViewDeck";
import EditDeck from "./views/EditDeck";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/deck/new" element={<CreateDeck />} />
          <Route path="/decks" element={<DeckList/>} />
          <Route path="/deck/:id/view" element={<ViewDeck/>}/>
          <Route path="/deck/:id/edit" element={<EditDeck/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
