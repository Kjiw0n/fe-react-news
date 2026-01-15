import { http, HttpResponse } from 'msw';
import pressData from '@/data/pressData.json';
import rollingNews from '@/data/rollingNews.json';
import type { PressData, RollingNewsResponse } from '@/constants/type';
import { getSubscribedNames } from './subscription';

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
  return data.map(({ logo, darkLogo, press }) => ({
    logo,
    darkLogo,
    press,
  }));
};

// view 파라미터 검증
const validateViewParameter = (
  view: string | null,
):
  | { isValid: true; view: 'grid' | 'list' }
  | { isValid: false; error: Response } => {
  if (!view) {
    return {
      isValid: false,
      error: HttpResponse.json(
        { success: false, error: 'view parameter is required' },
        { status: 400 },
      ),
    };
  }

  if (view !== 'grid' && view !== 'list') {
    return {
      isValid: false,
      error: HttpResponse.json(
        { success: false, error: 'view must be either "grid" or "list"' },
        { status: 400 },
      ),
    };
  }

  return { isValid: true, view };
};

// list view 전용: grouped 데이터에 전역 index 추가
const addGlobalIndex = (
  grouped: Record<string, Record<string, PressData[]>>,
) => {
  let index = 0;

  return Object.fromEntries(
    Object.entries(grouped).map(([groupKey, presses]) => [
      groupKey,
      Object.fromEntries(
        Object.entries(presses).map(([press, items]) => [
          press,
          items.map((item) => ({ ...item, index: index++ })),
        ]),
      ),
    ]),
  );
};

export const pressHandlers = [
  // 전체 언론사 조회
  http.get('/api/press/all', ({ request }) => {
    const url = new URL(request.url);
    const viewParam = url.searchParams.get('view');

    const validation = validateViewParameter(viewParam);
    if (!validation.isValid) {
      return validation.error;
    }

    const responseData =
      validation.view === 'grid'
        ? mapToGridView(pressData as PressData[])
        : addGlobalIndex(groupByCategory(pressData as PressData[]));

    return HttpResponse.json(responseData);
  }),

  // 구독한 언론사 조회
  http.get('/api/press/subscribed', ({ request }) => {
    const url = new URL(request.url);
    const viewParam = url.searchParams.get('view');

    const validation = validateViewParameter(viewParam);
    if (!validation.isValid) {
      return validation.error;
    }

    const subscribedList = (pressData as PressData[]).filter((p) =>
      getSubscribedNames().includes(p.press),
    );

    const responseData =
      validation.view === 'grid'
        ? mapToGridView(subscribedList as PressData[])
        : groupByPress(subscribedList as PressData[]);

    return HttpResponse.json(responseData);
  }),

  // 롤링 뉴스 조회
  http.get('/api/news/rolling', () => {
    return HttpResponse.json(rollingNews as RollingNewsResponse);
  }),
];
