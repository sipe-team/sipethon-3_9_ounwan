import { FortuneData } from '@/feature/form/form-response-schema.ts';

type FortuneCategory = 'health' | 'money' | 'love' | 'job';

export type MappedFortune = {
  type: FortuneCategory;
  displayName: string;
  score: number;
  desc: string;
  comment: string;
  oneLineComment: string;
};

export const mapFortuneData = (data: FortuneData): MappedFortune[] => {
  const getComment = (score: number, type: FortuneCategory): string => {
    switch (type) {
      case 'health':
        if (score <= 30) return `큰일나기 전에..`;
        if (score <= 60) return `주의가 필요해요ㅠ.ㅠ`;
        if (score <= 90) return `양호해요! :)`;
        return `놀라워요! O0O`;
      case 'money':
        if (score <= 30) return `재물운: 열일 할 준비..`;
        if (score <= 60) return `재물운: 마음만은 밀리어네어`;
        if (score <= 90) return `재물운: 재물이 들어올지도..?`;
        return `재물운: 돈 걱정 없는 한 해!`;
      case 'love':
        if (score <= 30) return `애정운: Wait~ 올해는 연애 스탑-!`;
        if (score <= 60) return `애정운: 사랑도 노력이 필요해ㅠ.ㅠ`;
        if (score <= 90) return `애정운: 운명의 짝을 만날 수도`;
        return `애정운: 적극적으로 사랑하세요!`;
      case 'job':
        if (score <= 30) return `직업운: 결정은 항상 신중하게..`;
        if (score <= 60) return `직업운: 아직은 노력을 기울여야..!`;
        if (score <= 90) return `직업운: 노력이 결실을 볼 때!`;
        return `직업운: 거침없이 상승하는 성취운!`;
      default:
        return '알 수 없는 운세';
    }
  };

  const mapCategory = (
    category: FortuneCategory,
    displayName: string,
    score: number,
    desc: string,
    oneLineComment: string
  ): MappedFortune => {
    return {
      type: category,
      displayName,
      score,
      desc,
      oneLineComment,
      comment: getComment(score, category),
    };
  };

  return [
    mapCategory(
      'health',
      '건강운',
      data?.health_score || 0,
      data?.health_desc,
      data?.health_one_line_comment
    ),
    mapCategory(
      'money',
      '재물운',
      data?.money_score || 0,
      data?.money_desc,
      data?.money_one_line_comment
    ),
    mapCategory(
      'love',
      '애정운',
      data?.love_score || 0,
      data?.love_desc,
      data?.love_one_line_comment
    ),
    mapCategory(
      'job',
      '직업운',
      data?.job_score || 0,
      data?.job_desc,
      data?.job_one_line_comment
    ),
  ];
};
