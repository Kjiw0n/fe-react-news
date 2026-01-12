import Header from './components/Header';
import NewsContentView from './components/news-stand/NewsContentView';
import NewsRolling from './components/rolling/NewsRolling';

function App() {
  return (
    <>
      <div className="mx-auto flex h-screen w-232.5 flex-col justify-center">
        <Header />
        <NewsRolling />
        <NewsContentView />
      </div>
    </>
  );
}

export default App;
