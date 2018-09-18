export const books = [
  { "id": 1,  "title": "Детское море", "author": "Николай Варухин", "genres": ["Наука", "Педагогика и воспитания", "Спорт"] },
  { "id": 2,  "title": "Владычица Озера", "author": "Анджей Сапковский", "genres": ["Фэнтези"] },
  { "id": 3,  "title": "Ловец человеков", "author": "Надежда Попова", "genres": ["Детектив", "Научная фантастика", "Тёмное фэнтези"] },
  { "id": 4,  "title": "Болтливый мертвец", "author": "Макс Фрай", "genres": ["Фэнтези"] },
  { "id": 5,  "title": "Меч Предназначения", "author": "Анджей Сапковский", "genres": ["Героический", "Фэнтези"] },
  { "id": 6,  "title": "Герцог де Л'Омлет", "author": "Эдгар Алан По,", "genres": ["Классические детективы", "Проза"] },
  { "id": 7,  "title": "На байдарке", "author": "Феликс Квадригин", "genres": ["Спорт"] },
  { "id": 8,  "title": "Тубурская игра", "author": "Макс Фрай", "genres": ["Детектив", "Фэнтези"] },
  { "id": 9,  "title": "Маяк", "author": "Эдгар Алан По,", "genres": ["Классические детективы", "Проза"] },
  { "id": 10, "title": "Последнее желание", "author": "Анджей Сапковский", "genres": ["Героический", "Фэнтези"] }
];

export const genres = books.reduce((acc, book) => {
  book.genres.forEach(genre => acc.includes(genre) ? null : acc.push(genre));
  return acc;
}, []);

export const columns = [
  { label: "Номер", type: "number", name: "id" },
  { label: "Название", type: "text", name: "title" },
  { label: "Автор", type: "text", name: "author" },
  { label: "Жанры", type: "select", name: "genres" },
];
