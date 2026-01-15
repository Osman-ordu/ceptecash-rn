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
import { SemanticColors } from '@/theme';
import { styles } from './styles';

export function ProfileActions() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          onPress: () => {
            // TODO: Implement delete account logic
            console.log('Delete account');
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

