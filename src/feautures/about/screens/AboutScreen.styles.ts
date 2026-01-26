import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    width: '100%',
    maxWidth: 520,
    gap: 16,
  },
  paragraph: {
    textAlign: 'left',
    opacity: 0.85,
    lineHeight: 24,
  },
  brandText: {
    fontWeight: '600',
  },
});
