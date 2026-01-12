import { Header } from "./components/Header";
import NewsContentView from "./components/news-stand/NewsContentView";
import NewsRolling from "./components/rolling/NewsRolling";

function App() {
  return (
    <>
      <div>
        <Header />
        <NewsRolling />
        <NewsContentView />
      </div>
    </>
  );
}

export default App;
