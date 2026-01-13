import { CATEGORY_LIST, type Category } from '@/constants/types/type';
import { useState } from 'react';

const ListView = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORY_LIST[0],
  );
  return (
    <div className="flex w-232.5 flex-col">
      <div className="bg-surface-alt border-border-default flex h-10 w-full flex-row justify-start border">
        {CATEGORY_LIST.map((category) => (
          <div
            key={category}
            className={`flex cursor-pointer flex-row items-center gap-2 px-4 hover:underline ${
              selectedCategory === category
                ? 'selected-bold14 text-white-default bg-brand-60 bg-fill-progress animate-fill-progress'
                : 'available-medium14 text-weak'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="border-border-default -mt-px flex flex-col gap-4 border p-6">
        <div className="flex flex-row items-center justify-start gap-4">
          <img src="http://placehold.co/53x20" alt="news logo" />
          <span className="display-medium12 text-default">
            2026.01.14. 18:27 편집
          </span>
          <div className="bg-surface-alt h-6">구독버튼 들어가야함</div>
        </div>

        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <img
              className="h-50 w-[320px]"
              src="http://placehold.co/320x200"
              alt="news-preview"
            />
            <span className="available-medium16 text-strong">
              동네 빵집 ‘작은 선물 포장 서비스’ ... (이미지 캡션)
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <ul className="available-medium16 text-bold flex flex-col gap-4">
              <li>반려동물 수제 간식 시장 확대… 소규모 창업도 증가세</li>
              <li>직장인 대상 ‘점심 산책 구독’ 서비스 등장… 수요 확인 단계</li>
              <li>소상공인, 단골 관리 프로그램 도입 확대… 매출 안정화 기대</li>
              <li>핸드메이드 굿즈 플랫폼 성장… 취미·부업 시장 동반 확대</li>
              <li>재택근무 확산에 ‘홈 오피스’ 용품 매출 증가세</li>
              <li>직원 복지 확대 기업 늘며 ‘조직문화 투자’ 확산</li>
            </ul>
            <span className="display-medium14 text-weak">
              서울경제 언론사에서 직접 편집한 뉴스입니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
