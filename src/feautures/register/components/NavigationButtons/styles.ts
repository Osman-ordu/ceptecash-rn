import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  navButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 52,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  backButtonDisabled: {
    opacity: 0.3,
  },
  nextButton: {
    flex: 1,
  },
  submitButtonContainer: {
    flex: 1,
  },
  submitButton: {
    width: '100%',
  },
  loginButtonContainer: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
  },
});

