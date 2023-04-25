
import { useContext, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";



import NotFound from "./screens/NotFound";


import Contacts from "./screens/Contacts";
import AddContact from "./screens/AddContact";
import EditContact from "./screens/EditContact";
import EditPhone from "./screens/EditPhone";



import ViewContact from "./screens/viewDetails/ViewContact";
import AddPhone from "./screens/AddPhone";


function App() {


  const sibebarRef = useRef(null);
  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);

  const sidebarHandler = () => setExpandState((prev) => !prev);

  return (
    <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <Contacts />
              }
            />
            <Route
              path="/contacts/:id"
              element={
       
                  <EditContact />
             
              }
            />
            <Route
              path="/contacts/create"
              element={
        
                  <AddContact />
            
              }
            />
            <Route
              path="/contact/:id"
              element={
    
                  <ViewContact />
           
              }
            />
            <Route
              path="/contacts/editPhone/:id"
              element={
    
                  <EditPhone />
           
              }
            />
            <Route
              path="/contacts/addPhone/:id"
              element={
    
                  <AddPhone />
           
              }
            />
            

            <Route path="*" element={<NotFound />} />
          </Routes>


    
    </BrowserRouter>
  );
}

export default App;
