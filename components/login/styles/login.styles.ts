import { StyleSheet, Platform, Dimensions } from 'react-native';
import { LOGIN_COLORS, LOGIN_CONFIG } from '../constants/login.constants';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const isLargeScreen = WINDOW_WIDTH > 768;

// 💅 ESTILOS RESPONSIVOS para el módulo de login
export const loginStyles = StyleSheet.create({
  // Contenedores principales
  safeArea: {
    flex: 1,
    backgroundColor: LOGIN_COLORS.primary,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: LOGIN_COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: LOGIN_CONFIG.spacing.xl,
    paddingHorizontal: LOGIN_CONFIG.spacing.lg,
  },

  // Decorative background shapes
  decorTop: {
    position: 'absolute',
    top: -140,
    left: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: LOGIN_COLORS.accent,
    opacity: 0.25,
  },
  decorBottom: {
    position: 'absolute',
    bottom: -180,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: LOGIN_COLORS.accent,
    opacity: 0.2,
  },
  
  // Card Container (Para Web / Tablets)
  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: LOGIN_COLORS.surface,
    padding: LOGIN_CONFIG.spacing.lg,
    borderRadius: LOGIN_CONFIG.cardRadius,
    marginTop: LOGIN_CONFIG.spacing.lg,
    ...Platform.select({
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
        elevation: 6,
        borderWidth: 1,
        borderColor: LOGIN_COLORS.border,
      },
      default: {},
    }),
  },

  // Header
  headerContainer: {
    alignItems: 'center',
    marginBottom: LOGIN_CONFIG.spacing.lg,
  },
  logoPlaceholder: {
    width: LOGIN_CONFIG.logoSize,
    height: LOGIN_CONFIG.logoSize,
    borderRadius: LOGIN_CONFIG.logoSize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: LOGIN_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: LOGIN_CONFIG.spacing.md,
  },
  logoIcon: {
    color: LOGIN_COLORS.white,
  },
  title: {
    fontSize: isLargeScreen ? 32 : 28,
    fontWeight: '800',
    color: LOGIN_COLORS.white,
    textAlign: 'center',
    marginBottom: LOGIN_CONFIG.spacing.xs,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Formulario
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: LOGIN_CONFIG.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: LOGIN_COLORS.text,
    marginBottom: LOGIN_CONFIG.spacing.xs,
  },
  inputContainer: {
    height: LOGIN_CONFIG.inputHeight,
    backgroundColor: LOGIN_COLORS.inputBackground,
    borderRadius: LOGIN_CONFIG.borderRadius,
    paddingHorizontal: LOGIN_CONFIG.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LOGIN_COLORS.border,
  },
  inputIcon: {
    marginRight: LOGIN_CONFIG.spacing.sm,
    color: LOGIN_COLORS.textSecondary,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    color: LOGIN_COLORS.text,
  },
  inputError: {
    borderColor: LOGIN_COLORS.error,
    borderWidth: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeButton: {
    position: 'absolute',
    right: LOGIN_CONFIG.spacing.md,
    top: '50%',
    marginTop: -12,
    padding: 4,
  },
  eyeText: {
    fontSize: 16,
    color: LOGIN_COLORS.primary,
  },

  // Botones
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: LOGIN_CONFIG.spacing.md,
    padding: LOGIN_CONFIG.spacing.xs,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: LOGIN_COLORS.primaryDark,
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LOGIN_CONFIG.spacing.md,
    gap: LOGIN_CONFIG.spacing.sm,
  },
  rememberBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: LOGIN_COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LOGIN_COLORS.white,
  },
  rememberBoxChecked: {
    backgroundColor: LOGIN_COLORS.primary,
    borderColor: LOGIN_COLORS.primary,
  },
  rememberCheck: {
    color: LOGIN_COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  rememberText: {
    color: LOGIN_COLORS.textSecondary,
    fontSize: 13,
  },
  loginButton: {
    height: LOGIN_CONFIG.buttonHeight,
    backgroundColor: LOGIN_COLORS.primary,
    borderRadius: LOGIN_CONFIG.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: LOGIN_CONFIG.spacing.lg,
    elevation: 2,
    shadowColor: LOGIN_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonDisabled: {
    backgroundColor: LOGIN_COLORS.textSecondary,
    elevation: 0,
    shadowOpacity: 0,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: LOGIN_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonLoader: {
    marginRight: LOGIN_CONFIG.spacing.sm,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: LOGIN_CONFIG.spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: LOGIN_COLORS.textSecondary,
  },
  signUpText: {
    fontSize: 14,
    color: LOGIN_COLORS.primary,
    fontWeight: '600',
  },
  
  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: LOGIN_CONFIG.cardRadius,
  },
});
