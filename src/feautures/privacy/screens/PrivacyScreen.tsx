import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenLayout } from '@/components/layout';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { styles } from './PrivacyScreen.styles';

export default function PrivacyScreen() {
  const navigation = useNavigation();
  const iconColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon');
  const backButtonBg = useThemeColor({}, 'card');

  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <ThemedView card style={styles.card}>
            <View style={styles.headerRow}>
              <Pressable
                style={[styles.backButton, { backgroundColor: backButtonBg }]}
                onPress={() => navigation.goBack()}
                hitSlop={8}
              >
                <Ionicons name="arrow-back" size={20} color={iconColor} />
              </Pressable>
              <ThemedText type="title" style={styles.headerTitle}>
                Gizlilik Politikasi
              </ThemedText>
              <View style={styles.headerSpacer} />
            </View>
            <ThemedText style={styles.subtitle}>Ceptecash</ThemedText>
            <View style={styles.content}>
              <ThemedText style={styles.paragraph}>
                Ceptecash olarak kullanıcılarımızın gizliliğini ve kişisel verilerinin
                güvenliğini önemsiyoruz. Bu gizlilik politikası, 6698 sayılı Kişisel
                Verilerin Korunması Kanunu (KVKK) kapsamında, hangi verilerin hangi
                amaçlarla işlendiğini ve nasıl korunduğunu açıklamaktadır.
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Toplanan Veriler</ThemedText>
              <ThemedText style={styles.paragraph}>
                Ceptecash uygulaması, hizmetlerin sunulabilmesi amacıyla yalnızca gerekli
                olan kişisel verileri toplar. Şifre bilgileriniz kesinlikle tarafımızca
                görülmez, saklanmaz veya erişilmez. Kimlik doğrulama süreçleri güvenli
                üçüncü parti servisler (ör. Firebase Authentication) üzerinden
                gerçekleştirilir.
              </ThemedText>
              <ThemedText style={styles.paragraph}>Toplanabilecek veriler şunlarla sınırlıdır:</ThemedText>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>E-posta adresi</ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>Kullanıcı kimliği (UID)</ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    Uygulama içi kullanım ve cihaz bilgileri (anonim ve istatistiksel)
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={styles.sectionTitle}>Verilerin Kullanım Amacı</ThemedText>
              <ThemedText style={styles.paragraph}>
                Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:
              </ThemedText>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    Kullanıcı hesabının oluşturulması ve yönetilmesi
                  </ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>Uygulama güvenliğinin sağlanması</ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>Hizmet kalitesinin artırılması</ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    Yasal yükümlülüklerin yerine getirilmesi
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={styles.sectionTitle}>Veri Güvenliği</ThemedText>
              <ThemedText style={styles.paragraph}>
                Kişisel verileriniz, güncel teknik ve idari güvenlik önlemleriyle
                korunmaktadır. Yetkisiz erişim, veri kaybı veya kötüye kullanım
                risklerine karşı gerekli tüm tedbirler alınmaktadır.
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Üçüncü Taraflarla Paylaşım</ThemedText>
              <ThemedText style={styles.paragraph}>
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle
                paylaşılmaz. Hizmetin teknik olarak sağlanabilmesi için kullanılan
                altyapı servisleri (ör. bulut ve kimlik doğrulama servisleri) KVKK’ya
                uygun şekilde çalışmaktadır.
              </ThemedText>

              <ThemedText style={styles.sectionTitle}>Kullanıcı Hakları</ThemedText>
              <ThemedText style={styles.paragraph}>
                KVKK’nın 11. maddesi uyarınca kullanıcılar;
              </ThemedText>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    Kişisel verilerinin işlenip işlenmediğini öğrenme
                  </ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>Verilere erişme</ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    Verilerin düzeltilmesini veya silinmesini talep etme
                  </ThemedText>
                </View>
                <View style={styles.bulletItem}>
                  <ThemedText style={styles.bulletDot}>•</ThemedText>
                  <ThemedText style={styles.bulletText}>Veri işlemeye itiraz etme</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.paragraph}>haklarına sahiptir.</ThemedText>

              <ThemedText style={styles.sectionTitle}>İletişim</ThemedText>
              <ThemedText style={styles.paragraph}>
                Gizlilik politikası ile ilgili her türlü soru ve talepleriniz için
                bizimle uygulama içi destek kanalları üzerinden iletişime geçebilirsiniz.
              </ThemedText>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
