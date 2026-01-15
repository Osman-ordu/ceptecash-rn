import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 16,
    fontWeight: '400',
  },
  addButton: {
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authPrompt: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.7,
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
});

