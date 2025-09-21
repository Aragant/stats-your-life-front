import './App.css'


import { RouterProvider } from "react-router"; // ✅ ICI
import { router } from './routes';




function App() {
  return <RouterProvider router={router} />;
}

export default App;
