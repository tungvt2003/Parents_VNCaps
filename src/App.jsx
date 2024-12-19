// import Navbar from "./components/navbar/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="max-w-md flex m-auto flex-col border">
      {/* <Navbar /> */}
      <div className="grow">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
