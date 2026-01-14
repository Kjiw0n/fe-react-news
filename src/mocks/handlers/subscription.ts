import { http, HttpResponse } from 'msw';
import pressData from '@/data/pressData.json';
import type { PressData } from '@/constants/type';

const STORAGE_KEY = 'subscribed-press-names';

// 로컬스토리지에서 구독 목록 가져오는 헬퍼 함수
export const getSubscribedNames = (): string[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : ['쿠키뉴스']; // 초기값
};

// 로컬스토리지에 구독 목록 저장하는 헬퍼 함수
export const setSubscribedNames = (names: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
};

// // groupedByCategory: { [category]: { [press]: PressData[] } }
// const groupByCategory = (data: PressData[]) => {
//   const grouped: Record<string, Record<string, PressData[]>> = {};

//   data.forEach((item) => {
//     if (!grouped[item.category]) grouped[item.category] = {};
//     if (!grouped[item.category][item.press])
//       grouped[item.category][item.press] = [];
//     grouped[item.category][item.press].push(item);
//   });

//   return grouped;
// };

// // groupedByPress: { [press]: { [press]: PressData[] } }
// const groupByPress = (data: PressData[]) => {
//   const grouped: Record<string, Record<string, PressData[]>> = {};

//   data.forEach((item) => {
//     if (!grouped[item.press]) grouped[item.press] = {};
//     grouped[item.press][item.press] = grouped[item.press][item.press] || [];
//     grouped[item.press][item.press].push(item);
//   });

//   return grouped;
// };

// // grid용 데이터 가공
// const mapToGridView = (data: PressData[]) => {
//   return data.map(({ logo, press }) => ({
//     logo,
//     press,
//   }));
// };

// export const subscriptionHandlers = [
//   // 전체 언론사 조회
//   http.get('/api/press/all', ({ request }) => {
//     const url = new URL(request.url);
//     const view = url.searchParams.get('view');

//     const responseData =
//       view === 'grid'
//         ? mapToGridView(pressData as PressData[])
//         : groupByCategory(pressData as PressData[]);

//     return HttpResponse.json(responseData);
//   }),

//   // 구독한 언론사 조회
//   http.get('/api/press/subscribed', ({ request }) => {
//     const url = new URL(request.url);
//     const view = url.searchParams.get('view');

//     const subscribedList = (pressData as PressData[]).filter((p) =>
//       subscribedPressNames.includes(p.press),
//     );

//     const responseData =
//       view === 'grid'
//         ? mapToGridView(subscribedList as PressData[])
//         : groupByPress(subscribedList as PressData[]);

//     return HttpResponse.json(responseData);
//   }),
// ];
