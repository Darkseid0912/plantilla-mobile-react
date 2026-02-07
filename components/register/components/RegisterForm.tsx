import React, { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { REGISTER_COLORS, REGISTER_STRINGS } from '../constants/register.constants';
import { useRegister } from '../composables/useRegister';
import { registerStyles as styles } from '../styles/register.styles';
import type { RegisterFormProps } from '../constants/register.types';

export const RegisterForm: React.FC<RegisterFormProps> = ({ onBackToLogin }) => {
  const { form, errors, isLoading, submitError, success, isValid, setField, submit } = useRegister();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState<Date>(new Date());

  const formatBirthDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseBirthDate = (value: string): Date | null => {
    const match = value.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/);
    if (!match) return null;
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3]);
    const parsed = new Date(year, month, day);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
  };

  const openDatePicker = () => {
    const parsed = parseBirthDate(form.birthDate);
    if (parsed) {
      setPickerDate(parsed);
    }
    setShowDatePicker(true);
  };

  const handleDateChange = (_event: unknown, selected?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowDatePicker(false);
    }
    if (selected) {
      setPickerDate(selected);
      setField('birthDate', formatBirthDate(selected));
    }
  };

  return (
    <View style={styles.form}>
      {submitError ? (
        <View style={[styles.banner, styles.bannerError]}>
          <Text style={styles.bannerText}>{submitError}</Text>
        </View>
      ) : null}

      {success ? (
        <View style={[styles.banner, styles.bannerSuccess]}>
          <Text style={styles.bannerText}>{success}</Text>
        </View>
      ) : null}

      <View style={styles.inputGroup}>
        <View style={[styles.inputContainer, errors.fullName ? styles.inputError : null]}>
          <MaterialCommunityIcons name="account-outline" size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.inputField}
            placeholder={REGISTER_STRINGS.fullNamePlaceholder}
            placeholderTextColor={REGISTER_COLORS.textMuted}
            value={form.fullName}
            onChangeText={(value) => setField('fullName', value)}
            autoComplete="name"
            textContentType="name"
          />
        </View>
        {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
          <MaterialCommunityIcons name="email-outline" size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.inputField}
            placeholder={REGISTER_STRINGS.emailPlaceholder}
            placeholderTextColor={REGISTER_COLORS.textMuted}
            value={form.email}
            onChangeText={(value) => setField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.rowItem]}>
          <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
            <MaterialCommunityIcons name="lock-outline" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder={REGISTER_STRINGS.passwordPlaceholder}
              placeholderTextColor={REGISTER_COLORS.textMuted}
              value={form.password}
              onChangeText={(value) => setField('password', value)}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="newPassword"
            />
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        <View style={[styles.inputGroup, styles.rowItem]}>
          <View style={[styles.inputContainer, errors.confirmPassword ? styles.inputError : null]}>
            <MaterialCommunityIcons name="lock-check-outline" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder={REGISTER_STRINGS.confirmPasswordPlaceholder}
              placeholderTextColor={REGISTER_COLORS.textMuted}
              value={form.confirmPassword}
              onChangeText={(value) => setField('confirmPassword', value)}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="newPassword"
            />
          </View>
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.rowItem]}>
          <Pressable onPress={openDatePicker}>
            <View style={[styles.inputContainer, errors.birthDate ? styles.inputError : null]}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder={REGISTER_STRINGS.birthDatePlaceholder}
                placeholderTextColor={REGISTER_COLORS.textMuted}
                value={form.birthDate}
                onChangeText={(value) => setField('birthDate', value)}
                keyboardType="number-pad"
                editable={Platform.OS === 'web'}
                pointerEvents={Platform.OS === 'web' ? 'auto' : 'none'}
              />
            </View>
          </Pressable>
          {errors.birthDate ? <Text style={styles.errorText}>{errors.birthDate}</Text> : null}
        </View>

        <View style={[styles.inputGroup, styles.rowItem]}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone-outline" size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder={REGISTER_STRINGS.phonePlaceholder}
              placeholderTextColor={REGISTER_COLORS.textMuted}
              value={form.phone}
              onChangeText={(value) => setField('phone', value)}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.checkboxRow} onPress={() => setField('acceptedTerms', !form.acceptedTerms)}>
        <View style={[styles.checkbox, form.acceptedTerms ? styles.checkboxChecked : null]}>
          {form.acceptedTerms ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.checkboxText}>{REGISTER_STRINGS.termsText}</Text>
      </Pressable>
      {errors.acceptedTerms ? <Text style={styles.errorText}>{errors.acceptedTerms}</Text> : null}

      <Pressable style={styles.checkboxRow} onPress={() => setField('acceptedPrivacy', !form.acceptedPrivacy)}>
        <View style={[styles.checkbox, form.acceptedPrivacy ? styles.checkboxChecked : null]}>
          {form.acceptedPrivacy ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.checkboxText}>{REGISTER_STRINGS.privacyText}</Text>
      </Pressable>
      {errors.acceptedPrivacy ? <Text style={styles.errorText}>{errors.acceptedPrivacy}</Text> : null}

      <TouchableOpacity
        style={[styles.submitButton, isLoading || !isValid ? styles.submitButtonDisabled : null]}
        onPress={submit}
        disabled={isLoading || !isValid}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator color={REGISTER_COLORS.white} />
        ) : (
          <Text style={styles.submitButtonText}>{REGISTER_STRINGS.registerButton}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity disabled={isLoading} onPress={onBackToLogin}>
        <Text style={styles.footerText}>{REGISTER_STRINGS.backToLogin}</Text>
      </TouchableOpacity>

      {showDatePicker ? (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'default'}
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      ) : null}
    </View>
  );
};
