import { http, HttpResponse } from 'msw';
import pressData from '@/data/pressData.json';
import rollingNews from '@/data/rollingNews.json';
import type { PressData, RollingNewsResponse } from '@/constants/type';

const subscribedPressNames: string[] = ['쿠키뉴스'];

// groupedByCategory: { [category]: { [press]: PressData[] } }
const groupByCategory = (data: PressData[]) => {
  const grouped: Record<string, Record<string, PressData[]>> = {};

  data.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = {};
    if (!grouped[item.category][item.press])
      grouped[item.category][item.press] = [];
    grouped[item.category][item.press].push(item);
  });

  return grouped;
};

// groupedByPress: { [press]: { [press]: PressData[] } }
const groupByPress = (data: PressData[]) => {
  const grouped: Record<string, Record<string, PressData[]>> = {};

  data.forEach((item) => {
    if (!grouped[item.press]) grouped[item.press] = {};
    grouped[item.press][item.press] = grouped[item.press][item.press] || [];
    grouped[item.press][item.press].push(item);
  });

  return grouped;
};

// grid용 데이터 가공
const mapToGridView = (data: PressData[]) => {
  return data.map(({ logo, press }) => ({
    logo,
    press,
  }));
};

export const pressHandlers = [
  // 전체 언론사 조회
  http.get('/api/press/all', ({ request }) => {
    const url = new URL(request.url);
    const view = url.searchParams.get('view');

    const responseData =
      view === 'grid'
        ? mapToGridView(pressData as PressData[])
        : groupByCategory(pressData as PressData[]);

    return HttpResponse.json(responseData);
  }),

  // 구독한 언론사 조회
  http.get('/api/press/subscribed', ({ request }) => {
    const url = new URL(request.url);
    const view = url.searchParams.get('view');

    const subscribedList = (pressData as PressData[]).filter((p) =>
      subscribedPressNames.includes(p.press),
    );

    const responseData =
      view === 'grid'
        ? mapToGridView(subscribedList as PressData[])
        : groupByPress(subscribedList as PressData[]);

    return HttpResponse.json(responseData);
  }),

  // 롤링 뉴스 조회
  http.get('/api/news/rolling', () => {
    return HttpResponse.json(rollingNews as RollingNewsResponse);
  }),
];
