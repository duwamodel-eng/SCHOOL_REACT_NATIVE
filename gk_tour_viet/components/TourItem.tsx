
import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Tour, formatDate, getSeatLabel } from '../utils/tour';

interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

function TourItem({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}: TourItemProps) {
  return (
    <View
      style={[
        styles.container,
        compact && styles.compactContainer,
      ]}
    >
      {/* CÂU 4 - THÊM: khung ảnh và nút tim cho compact */}
      <View
        style={[
          !compact && styles.rowContent,
          compact && styles.compactImageWrapper,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.card,
            compact && styles.compactCard,
          ]}
          activeOpacity={0.8}
          onPress={() => onPress(tour)}
        >
          <Image
            source={{ uri: tour.image }}
            style={[
              styles.image,
              compact && styles.compactImage,
            ]}
            resizeMode="cover"
          />

          <View style={styles.info}>
            <Text
              style={styles.name}
              numberOfLines={compact ? 1 : 2}
            >
              {tour.name}
            </Text>

            {/* CÂU 3: compact ẩn thành phố, ngày và số chỗ */}
            {!compact && (
              <>
                <Text style={styles.text}>
                  {tour.city}
                </Text>

                <Text style={styles.text}>
                  📅 {formatDate(tour.departure)} · {tour.days} ngày
                </Text>

                <Text
                  style={[
                    styles.seats,
                    tour.seats <= 3 && styles.lowSeats,
                  ]}
                >
                  {getSeatLabel(tour.seats)}
                </Text>
              </>
            )}

            <Text style={styles.price}>
              {tour.price.toLocaleString('vi-VN')} ₫
            </Text>
          </View>
        </TouchableOpacity>

        {/* CÂU 4 - SỬA: tim nằm đè trên ảnh khi compact */}
        <TouchableOpacity
          testID="fav-btn"
          style={[
            styles.heartButton,
            compact && styles.compactHeartButton,
          ]}
          onPress={() =>
            onToggleFavorite(tour.id, !tour.isFavorite)
          }
        >
          <Text style={styles.heart}>
            {tour.isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Giữ yêu cầu Câu 3: chỉ một component, dùng React.memo
export default React.memo(TourItem);

const styles = StyleSheet.create({
  // Bố cục thường: ảnh trái, thông tin giữa, tim phải
  container: {
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    marginTop: 3,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#087F5B',
    marginTop: 4,
  },
  seats: {
    fontSize: 13,
    marginTop: 3,
  },
  lowSeats: {
    color: 'red',
    fontWeight: 'bold',
  },
  heartButton: {
    padding: 8,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    fontSize: 28,
    color: 'red',
  },

  // CÂU 4 - THÊM: thẻ compact rộng 160, xếp dọc
  compactContainer: {
    width: 160,
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 8,
  },
  compactImageWrapper: {
    width: '100%',
    position: 'relative',
  },
  compactCard: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  compactImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },
  compactHeartButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
    padding: 4,
    marginLeft: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
});
