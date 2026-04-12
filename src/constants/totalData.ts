import temp from "../assets/temporary-image.png";

export interface RankItem {
  id: number;
  title: string;
  img: string;
  likes: number;
  createdAt: string; // ISO 8601 형식 (YYYY-MM-DD)
}

export const RANK_DATA: RankItem[] = [
  {
    id: 1,
    title: "블루베리 비빔밥",
    img: temp,
    likes: 100,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    title: "고추장 마요 달걀밥",
    img: temp,
    likes: 97,
    createdAt: "2024-01-05",
  },
  {
    id: 3,
    title: "두바이 쫀득쿠키",
    img: temp,
    likes: 44,
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "허니버터 감자 핫도그",
    img: temp,
    likes: 10,
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    title: "로제 마라샹궈",
    img: temp,
    likes: 0,
    createdAt: "2024-01-20",
  },
  {
    id: 6,
    title: "우삼겹 차돌 마라탕",
    img: temp,
    likes: 1,
    createdAt: "2024-01-22",
  },
  {
    id: 7,
    title: "버터 갈릭 감자튀김",
    img: temp,
    likes: 88,
    createdAt: "2024-01-24",
  },
  {
    id: 8,
    title: "크루아상 샌드위치",
    img: temp,
    likes: 12,
    createdAt: "2024-01-25",
  },
  {
    id: 9,
    title: "아이스바닐라라떼",
    img: temp,
    likes: 5,
    createdAt: "2024-01-26",
  },
  {
    id: 10,
    title: "간장계란밥",
    img: temp,
    likes: 7,
    createdAt: "2024-01-26",
  },
  {
    id: 11,
    title: "김치볶음밥",
    img: temp,
    likes: 120,
    createdAt: "2023-12-20",
  },
  {
    id: 12,
    title: "된장찌개",
    img: temp,
    likes: 85,
    createdAt: "2023-12-21",
  },
  {
    id: 13,
    title: "불고기",
    img: temp,
    likes: 150,
    createdAt: "2023-12-25",
  },
  {
    id: 14,
    title: "떡볶이",
    img: temp,
    likes: 200,
    createdAt: "2024-01-02",
  },
  {
    id: 15,
    title: "제육볶음",
    img: temp,
    likes: 110,
    createdAt: "2024-01-03",
  },
  {
    id: 16,
    title: "냉면",
    img: temp,
    likes: 30,
    createdAt: "2024-01-08",
  },
  {
    id: 17,
    title: "돈까스",
    img: temp,
    likes: 65,
    createdAt: "2024-01-12",
  },
  {
    id: 18,
    title: "파스타",
    img: temp,
    likes: 40,
    createdAt: "2024-01-18",
  },
  {
    id: 19,
    title: "피자",
    img: temp,
    likes: 55,
    createdAt: "2024-01-21",
  },
  {
    id: 20,
    title: "치킨",
    img: temp,
    likes: 300,
    createdAt: "2024-01-26",
  },
];
