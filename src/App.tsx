import Header from './components/commons/Header';
import Alert from './components/commons/Alert';
import NewsStand from './components/news-stand/NewsStand';
import NewsRolling from './components/rolling/NewsRolling';
import SubButton from './components/commons/SubButton';
import type { PressData } from './constants/types/type';
import { useEffect, useState } from 'react';

function App() {
  const [pressData, setPressData] = useState<PressData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/press-data');
        const data = await res.json();
        setPressData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto flex h-screen w-232.5 flex-col justify-center">
        <Alert pressName="서울경제" />
        <Header />
        <NewsRolling />
        <NewsStand pressData={pressData} />
        <SubButton isSubscribed={true} pressName="서울경제" />
      </div>
    </>
  );
}

export default App;
