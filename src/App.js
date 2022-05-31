import { Outlet } from "react-router-dom"
import Header from "./components/App/Header";

function App() {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>      
    </div>
  );
}

export default App;
