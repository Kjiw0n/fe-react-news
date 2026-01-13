import Header from './components/commons/Header';
import NewsStand from './components/news-stand/NewsStand';
import NewsRolling from './components/rolling/NewsRolling';

function App() {
  return (
    <>
      <div className="bg-background-default mx-auto flex h-screen w-screen justify-center sm:px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="flex h-full max-w-232.5 flex-col justify-center">
          <Header />
          <NewsRolling />
          <NewsStand />
        </div>
      </div>
    </>
  );
}

export default App;
