export interface FortuneData {
  // 기본 정보
  username: string;
  id: string;

  // 각 영역별 점수 (0-100)
  health_score: number;
  money_score: number;
  love_score: number;
  job_score: number;

  // 각 영역별 상세 설명
  health_desc: string;
  money_desc: string;
  love_desc: string;
  job_desc: string;

  // 각 영역별 한 줄 코멘트
  health_one_line_comment: string;
  money_one_line_comment: string;
  love_one_line_comment: string;
  job_one_line_comment: string;
}
