import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
       <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;