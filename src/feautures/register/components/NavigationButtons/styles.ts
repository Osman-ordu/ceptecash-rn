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
    paddingHorizontal: 4,
    gap: 8,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  backButton: {
    minWidth: 64,
    flexShrink: 0,
  },
  backButtonDisabled: {
    opacity: 0.3,
  },
  nextButton: {
    minWidth: 120,
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignSelf: 'stretch',
  },
  nextLabel: {
    flexShrink: 1,
    textAlign: 'right',
  },
});

