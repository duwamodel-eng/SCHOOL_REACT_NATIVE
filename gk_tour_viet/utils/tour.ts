
export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

export function groupByCity(tours: Tour[]) {
  const cities = [...new Set(tours.map(item => item.city))];

  return cities
    .sort((a, b) => a.localeCompare(b, 'vi'))
    .map(city => ({
      title: city,
      data: tours
        .filter(item => item.city === city)
        .sort((a, b) =>
          a.departure.localeCompare(b.departure)
        ),
    }));
}

// cau 3: THÊM MỚI - Đổi YYYY-MM-DD thành DD/MM/YYYY
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

// cau 3: THÊM MỚI - Tạo nhãn số chỗ còn lại
export function getSeatLabel(seats: number): string {
  if (seats === 0) {
    return 'Hết chỗ';
  }

  if (seats <= 3) {
    return `Chỉ còn ${seats} chỗ`;
  }

  return `Còn ${seats} chỗ`;
}
