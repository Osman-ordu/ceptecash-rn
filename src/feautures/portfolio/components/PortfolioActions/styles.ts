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
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  buyButton: {
    backgroundColor: SemanticColors.success,
  },
  sellButton: {
    borderColor: SemanticColors.error,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: OverlayColors.overlayLight,
  },
  secondaryActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

