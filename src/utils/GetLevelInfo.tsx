export const levelTable = [
  { level: 1, min: 0, max: 49, name: '가짜팬' },
  { level: 2, min: 50, max: 149, name: '조금팬' },
  { level: 3, min: 150, max: 299, name: '관심팬' },
  { level: 4, min: 300, max: 599, name: '찐팬' },
  { level: 5, min: 600, max: 999, name: '왕팬' },
  { level: 6, min: 1000, max: 1499, name: '매니아' },
  { level: 7, min: 1500, max: 2199, name: '레전드' },
  { level: 8, min: 2200, max: 2999, name: '오덕' },
  { level: 9, min: 3000, max: Infinity, name: 'VIP/십덕' },
];

// 진행률 반환 하도록 구현할 것
export default function GetLevelInfo(points: number) {
  const current =
    levelTable.find(lv => points >= lv.min && points <= lv.max) ||
    levelTable[0];
  const next = levelTable.find(lv => lv.level === current.level + 1);
  const TotalPercent = next
    ? ((points - current.min) / (next.min - current.min)) * 100
    : 100;

  return {
    ...current,
    percent: Math.min(TotalPercent, 100),
    nextLevelPoints: next ? next.min - points : 0,
    nextLevelName: next?.name,
  };
}
