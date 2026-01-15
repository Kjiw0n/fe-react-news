import { http, HttpResponse } from 'msw';

const STORAGE_KEY = 'subscription-storage';

// 로컬스토리지에서 구독 목록 가져오는 헬퍼 함수
export const getSubscribedNames = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return ['쿠키뉴스']; // 초기값

    const parsed = JSON.parse(saved);

    // 배열인지 확인
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // zustand 스토어 형태 체크 (state.subscriptions 같은 형태)
    if (
      parsed?.state?.subscriptions &&
      Array.isArray(parsed.state.subscriptions)
    ) {
      return parsed.state.subscriptions;
    }

    return ['쿠키뉴스']; // 예상하지 못한 형태면 초기값 반환
  } catch (error) {
    console.error('Failed to parse subscribed names:', error);
    return ['쿠키뉴스']; // 파싱 실패 시 초기값
  }
};

// 로컬스토리지에 구독 목록 저장하는 헬퍼 함수
export const setSubscribedNames = (names: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
};

// pressName 파라미터 검증
const validatePressName = (
  pressName: string | null,
):
  | { isValid: true; pressName: string }
  | { isValid: false; error: Response } => {
  if (!pressName) {
    return {
      isValid: false,
      error: HttpResponse.json(
        { success: false, error: 'pressName is required' },
        { status: 400 },
      ),
    };
  }

  return { isValid: true, pressName };
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
    const pressNameParam = url.searchParams.get('pressName');

    const validation = validatePressName(pressNameParam);
    if (!validation.isValid) {
      return validation.error;
    }

    const currentNames = getSubscribedNames();

    // 구독 중이 아닌 언론사인지 확인
    if (!currentNames.includes(validation.pressName)) {
      return HttpResponse.json(
        { success: false, error: '구독 중이 아닌 언론사입니다' },
        { status: 404 },
      );
    }

    const updatedNames = currentNames.filter(
      (name) => name !== validation.pressName,
    );
    setSubscribedNames(updatedNames);
    return HttpResponse.json({ success: true });
  }),

  // 구독 추가
  http.post('/api/subscription', async ({ request }) => {
    const url = new URL(request.url);
    const pressNameParam = url.searchParams.get('pressName');

    const validation = validatePressName(pressNameParam);
    if (!validation.isValid) {
      return validation.error;
    }

    const currentNames = getSubscribedNames();
    if (!currentNames.includes(validation.pressName)) {
      currentNames.push(validation.pressName);
      setSubscribedNames(currentNames);
    }
    return HttpResponse.json({ success: true });
  }),
];
