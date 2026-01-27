import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    justifyContent: 'center',
    flexGrow: 1,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    paddingTop: 24,
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 520,
    height: 520,
  },
  headerContainer: {
    width: '100%',
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 12,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
    height: 240,
    justifyContent: 'flex-start',
  },
});
