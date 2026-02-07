import { Dimensions, Platform, StyleSheet } from 'react-native';
import { REGISTER_COLORS, REGISTER_CONFIG } from '../constants/register.constants';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 768;

export const registerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: REGISTER_COLORS.primary,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: REGISTER_COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: REGISTER_CONFIG.spacing.xl,
    paddingHorizontal: REGISTER_CONFIG.spacing.lg,
  },
  decorTop: {
    position: 'absolute',
    top: -140,
    left: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: REGISTER_COLORS.accent,
    opacity: 0.25,
  },
  decorBottom: {
    position: 'absolute',
    bottom: -180,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: REGISTER_COLORS.accent,
    opacity: 0.2,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: REGISTER_COLORS.card,
    borderRadius: REGISTER_CONFIG.cardRadius,
    padding: REGISTER_CONFIG.spacing.lg,
    marginTop: REGISTER_CONFIG.spacing.lg,
    ...Platform.select({
      web: {
        borderWidth: 1,
        borderColor: REGISTER_COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
      },
      default: {},
    }),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: REGISTER_CONFIG.spacing.lg,
  },
  logo: {
    width: REGISTER_CONFIG.logoSize,
    height: REGISTER_CONFIG.logoSize,
    borderRadius: REGISTER_CONFIG.logoSize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: REGISTER_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: REGISTER_CONFIG.spacing.md,
  },
  logoIcon: {
    color: REGISTER_COLORS.white,
  },
  title: {
    color: REGISTER_COLORS.white,
    fontSize: isLargeScreen ? 30 : 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: REGISTER_CONFIG.spacing.xs,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 15,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: REGISTER_CONFIG.spacing.md,
  },
  row: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: REGISTER_CONFIG.spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  label: {
    color: REGISTER_COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: REGISTER_CONFIG.spacing.xs,
  },
  inputContainer: {
    height: REGISTER_CONFIG.inputHeight,
    backgroundColor: REGISTER_COLORS.inputBackground,
    borderColor: REGISTER_COLORS.border,
    borderWidth: 1,
    borderRadius: REGISTER_CONFIG.borderRadius,
    paddingHorizontal: REGISTER_CONFIG.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: REGISTER_CONFIG.spacing.sm,
    color: REGISTER_COLORS.textSecondary,
  },
  inputField: {
    flex: 1,
    color: REGISTER_COLORS.text,
    fontSize: 15,
  },
  inputError: {
    borderColor: REGISTER_COLORS.error,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: REGISTER_CONFIG.spacing.sm,
    marginBottom: REGISTER_CONFIG.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: REGISTER_COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: REGISTER_COLORS.white,
  },
  checkboxChecked: {
    backgroundColor: REGISTER_COLORS.primary,
    borderColor: REGISTER_COLORS.primary,
  },
  checkmark: {
    color: REGISTER_COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxText: {
    flex: 1,
    color: REGISTER_COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  errorText: {
    marginTop: REGISTER_CONFIG.spacing.xs,
    color: REGISTER_COLORS.error,
    fontSize: 12,
  },
  banner: {
    borderRadius: REGISTER_CONFIG.cardRadius,
    padding: REGISTER_CONFIG.spacing.md,
    marginBottom: REGISTER_CONFIG.spacing.md,
    borderLeftWidth: 4,
  },
  bannerError: {
    backgroundColor: '#FFECEC',
    borderLeftColor: REGISTER_COLORS.error,
  },
  bannerSuccess: {
    backgroundColor: '#EBF9F2',
    borderLeftColor: REGISTER_COLORS.success,
  },
  bannerText: {
    fontSize: 13,
    color: REGISTER_COLORS.text,
  },
  submitButton: {
    marginTop: REGISTER_CONFIG.spacing.md,
    height: REGISTER_CONFIG.buttonHeight,
    borderRadius: REGISTER_CONFIG.borderRadius,
    backgroundColor: REGISTER_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: REGISTER_COLORS.textMuted,
  },
  submitButtonText: {
    color: REGISTER_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    marginTop: REGISTER_CONFIG.spacing.lg,
    textAlign: 'center',
    color: REGISTER_COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
