// import Navbar from "./components/navbar/Navbar";
import AppRouter from "./router/AppRouter";
import { ContextProvider } from "./pages/context";

function App() {
  return (
    <div className="max-w-md flex m-auto flex-col border">
      {/* <Navbar /> */}
      <div className="grow">
        <ContextProvider>
          <AppRouter />
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;
