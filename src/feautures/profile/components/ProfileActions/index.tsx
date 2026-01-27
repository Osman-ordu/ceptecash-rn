import React from 'react';
import { Alert,Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { auth } from '@/lib/firebase';
import { RootStackParamList } from '@/navigation/types';
import { useAppDispatch } from '@/store/hooks';
import { deleteUser } from '@/store/user';
import { SemanticColors } from '@/theme';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { styles } from './styles';

export function ProfileActions() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
                await signOut(auth);
                navigation.navigate('Login' as keyof RootStackParamList);
                Alert.alert('Çıkış başarılı', 'Çıkış yapıldı');
            } catch (error) {
              console.error('Çıkış hatası:', error);
              Alert.alert('Çıkış hatası', 'Çıkış yapılırken bir hata oluştu');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await dispatch(deleteUser()).unwrap();
              await signOut(auth);
              showSuccessToast(response?.message || 'Hesap silindi.');
              navigation.navigate('Login' as keyof RootStackParamList);
            } catch (error: any) {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                'Hesap silinirken bir hata oluştu.';
              showErrorToast(message);
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <Pressable style={styles.actionItem} onPress={handleLogout}>
          <View style={[styles.iconContainer, styles.logoutIcon]}>
            <Ionicons name="log-out-outline" size={22} color={SemanticColors.error} />
          </View>
          <ThemedText style={[styles.actionText, styles.logoutText]}>
            Çıkış Yap
          </ThemedText>
        </Pressable>

        <View style={styles.separator} />

        <Pressable style={styles.actionItem} onPress={handleDeleteAccount}>
          <View style={[styles.iconContainer, styles.deleteIcon]}>
            <Ionicons name="trash-outline" size={22} color={SemanticColors.error} />
          </View>
          <ThemedText style={[styles.actionText, styles.deleteText]}>
            Hesabı Sil
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

