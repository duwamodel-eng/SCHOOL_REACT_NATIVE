
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert, Switch, RefreshControl, TextInput, SectionList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useState, useEffect, useMemo, useCallback } from 'react'
import React from 'react';

import { Tour, groupByCity } from './utils/tour';
import TourItem from './components/TourItem';

const API_URL = 'https://6ad64846f71f154ac486bc8c.mockapi.io/Tour';

export default function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Câu 6: trạng thái làm mới

  // Câu 6: gom logic GET API để dùng cho cả lần tải đầu và kéo xuống làm mới
  const loadTours = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error('Lỗi tải danh sách tour');
      }

      const result: Tour[] = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể tải danh sách tour');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Tải dữ liệu lần đầu
  useEffect(() => {
    loadTours();
  }, [loadTours]);

  // Câu 6a: lọc theo tên bằng useMemo
  // Không phân biệt hoa thường, loại bỏ khoảng trắng đầu/cuối
  const filteredTours = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (keyword === '') {
      return data;
    }

    return data.filter(tour =>
      tour.name.toLowerCase().includes(keyword)
    );
  }, [data, search]);

  // Câu 6a: chỉ nhóm những tour đã lọc; thành phố không còn tour sẽ tự biến mất
  const sections = useMemo(
    () => groupByCity(filteredTours),
    [filteredTours]
  );

  // Giữ nguyên: Tour yêu thích lấy từ toàn bộ dữ liệu, không bị ảnh hưởng bởi search
  const favoriteTours = useMemo(
    () => data.filter(tour => tour.isFavorite),
    [data]
  );

  // // Câu 5: cập nhật yêu thích bằng PUT, cập nhật giao diện trước
  const toggleFavorite = async (id: string, next: boolean) => {
    const oldTour = data.find(tour => tour.id === id);

    if (!oldTour) return;

    const previousFavorite = oldTour.isFavorite;

    // Cập nhật giao diện ngay lập tức
    setData(prev =>
      prev.map(tour =>
        tour.id === id
          ? { ...tour, isFavorite: next }
          : tour
      )
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });

      if (!res.ok) {
        throw new Error('Không thể cập nhật yêu thích');
      }
    } catch (error) {
      console.log(error);

      // Nếu API lỗi, khôi phục trạng thái yêu thích cũ
      setData(prev =>
        prev.map(tour =>
          tour.id === id
            ? { ...tour, isFavorite: previousFavorite }
            : tour
        )
      );

      Alert.alert(
        'Lỗi',
        'Không thể cập nhật yêu thích. Vui lòng thử lại!'
      );
    }
  };

  const handleTourPress = (tour: Tour) => {
    Alert.alert(
      tour.name,
      `Ngày khởi hành: ${tour.departure}\n` +
        `Số ngày: ${tour.days} ngày\n` +
        `Giá: ${tour.price.toLocaleString('vi-VN')} ₫`
    );
  };

  // Câu 6c: kéo xuống sẽ GET lại API, không thay đổi search
  const handleRefresh = () => {
    loadTours(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tour Việt</Text>

          <Text style={styles.student}>
            MSSV - Họ tên sinh viên
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Tìm tour theo tên..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled={true}

            // Câu 6c: kéo xuống để gọi lại GET API
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }

            // // Tour yêu thích không dùng filteredTours nên tìm kiếm không ảnh hưởng
            // ListHeaderComponent={
            //   <View style={styles.favoriteSection}>
            //     <Text style={styles.favoriteTitle}>
            //       Tour yêu thích ({favoriteTours.length})
            //     </Text>

            //     {favoriteTours.length === 0 ? (
            //       <Text style={styles.emptyFavorite}>
            //         Chưa có tour yêu thích
            //       </Text>
            //     ) : (
            //       <FlatList
            //         horizontal
            //         data={favoriteTours}
            //         keyExtractor={item => item.id}
            //         showsHorizontalScrollIndicator={false}
            //         ItemSeparatorComponent={() => (
            //           <View style={{ width: 10 }} />
            //         )}
            //         renderItem={({ item }) => (
            //           <TourItem
            //             tour={item}
            //             compact={true}
            //             onPress={handleTourPress}
            //             onToggleFavorite={toggleFavorite}
            //           />
            //         )}
            //       />
            //     )}
            //   </View>
            // }

            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>
                {section.title} · {section.data.length} tour
              </Text>
            )}

            renderItem={({ item }) => (
              <TourItem
                tour={item}
                onPress={handleTourPress}
                onToggleFavorite={toggleFavorite}
              />
            )}

            // Câu 6c: không có tour khớp từ khóa thì hiển thị thông báo
            ListEmptyComponent={
              <Text style={styles.emptyResult}>
                Không tìm thấy tour phù hợp
              </Text>
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  student: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  loading: {
    marginTop: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: '#EEEEEE',
  },
  favoriteSection: {
    paddingVertical: 12,
    backgroundColor: '#F7F7F7',
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  emptyFavorite: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  // Câu 6: giao diện khi tìm kiếm không có kết quả
  emptyResult: {
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    fontSize: 16,
    color: '#666666',
  },
});
