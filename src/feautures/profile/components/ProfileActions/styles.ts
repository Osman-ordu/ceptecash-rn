import { StyleSheet } from 'react-native';
import { OverlayColors,SemanticColors } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutIcon: {
    backgroundColor: SemanticColors.errorBackground,
  },
  deleteIcon: {
    backgroundColor: SemanticColors.errorBackground,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutText: {
    color: SemanticColors.error,
  },
  deleteText: {
    color: SemanticColors.error,
  },
  separator: {
    height: 1,
    backgroundColor: OverlayColors.overlayLighter,
    marginLeft: 52,
  },
});

