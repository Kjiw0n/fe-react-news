import Header from './components/commons/Header';
import NewsStand from './components/news-stand/NewsStand';
import NewsRolling from './components/rolling/NewsRolling';

function App() {
  return (
    <>
      <div className="mx-auto flex h-screen w-232.5 flex-col justify-center">
        <Header />
        <NewsRolling />
        <NewsStand />
      </div>
    </>
  );
}

export default App;
