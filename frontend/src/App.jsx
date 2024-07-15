import Navbar from "./components/Navbar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <section id="cardSearch"></section>
      <section id="cardList"></section>
      <footer></footer>
    </div>
  );
}

export default App;
