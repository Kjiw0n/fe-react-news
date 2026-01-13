import Header from './components/commons/Header';
import Alert from './components/commons/Alert';
import NewsStand from './components/news-stand/NewsStand';
import NewsRolling from './components/rolling/NewsRolling';
import SubButton from './components/commons/SubButton';

function App() {
  return (
    <>
      <div className="mx-auto flex h-screen w-232.5 flex-col justify-center">
        <Alert pressName="서울경제" />
        <Header />
        <NewsRolling />
        <NewsStand />
        <SubButton isSubscribed={true} pressName="서울경제" />
      </div>
    </>
  );
}

export default App;
