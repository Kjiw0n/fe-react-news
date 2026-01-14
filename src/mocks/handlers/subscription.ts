import { http, HttpResponse } from 'msw';

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

export const subscriptionHandlers = [
  // 구독한 언론사 이름들 가져오기
  http.get('/api/subscription', () => {
    const names = getSubscribedNames();
    return HttpResponse.json(names);
  }),

  // 구독 취소
  http.delete('/api/subscription', async ({ request }) => {
    const url = new URL(request.url);
    const pressName = url.searchParams.get('pressName');

    if (!pressName) {
      return HttpResponse.json(
        { success: false, error: 'pressName is required' },
        { status: 400 },
      );
    }

    const currentNames = getSubscribedNames();

    // 구독 중이 아닌 언론사인지 확인
    if (!currentNames.includes(pressName)) {
      return HttpResponse.json(
        { success: false, error: '구독 중이 아닌 언론사입니다' },
        { status: 404 },
      );
    }

    const updatedNames = currentNames.filter((name) => name !== pressName);
    setSubscribedNames(updatedNames);
    return HttpResponse.json({ success: true });
  }),

  // 구독 추가
  http.post('/api/subscription', async ({ request }) => {
    const url = new URL(request.url);
    const pressName = url.searchParams.get('pressName');

    if (!pressName) {
      return HttpResponse.json(
        { success: false, error: 'pressName is required' },
        { status: 400 },
      );
    }

    const currentNames = getSubscribedNames();
    if (!currentNames.includes(pressName)) {
      currentNames.push(pressName);
      setSubscribedNames(currentNames);
    }
    return HttpResponse.json({ success: true });
  }),
];
