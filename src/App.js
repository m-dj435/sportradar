import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import About from "./pages/about";
import Homepage from "./pages/homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TableContextProvider from "./provider/TableContextProvider";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <TableContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about/:id" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TableContextProvider>
    </div>
  );
}

export default App;
