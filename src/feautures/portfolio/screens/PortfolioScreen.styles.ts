import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  authCard: {
    borderRadius: 16,
    padding: 32,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  authPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  authMessage: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  authButton: {
    flex: 1,
    maxWidth: 150,
  },
  createButton: {
    width: '100%',
    maxWidth: 250,
  },
});