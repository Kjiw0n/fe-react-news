/**
 *
 * 클래스 "date"를 가진 DOM 요소를 찾아 현재 날짜와 요일을 한국어 형식 (YYYY. MM. DD. DAY요일)으로 채우는 함수
 *
 * @function updateDate
 * @returns {void}
 */
export function updateDate(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const day = now.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return `${yyyy}. ${mm}. ${dd}. ${days[day]}요일`;
}

/**
 * 배열의 요소를 무작위로 섞어서 새로운 배열을 반환하는 함수 (Fisher-Yates Shuffle)
 *
 * @function shuffle
 * @param {T[]} array - 무작위로 섞을 원본 배열
 * @returns {T[]} 요소를 무작위 순서로 재배치한 새로운 배열
 * @template T
 */
export function shuffle<T>(array: T[]) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
