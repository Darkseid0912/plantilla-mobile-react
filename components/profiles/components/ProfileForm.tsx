import React, { useState } from 'react';
import { Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { profilesStyles as styles } from '../styles/profiles.styles';
import { PROFILES_STRINGS } from '../constants/profiles.constants';
import { useProfileForm } from '../hooks/useProfileForm';
import { MessageBanner } from '../../login/components/MessageBanner';

export const ProfileForm: React.FC = () => {
  const [isRelationOpen, setIsRelationOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState<Date>(new Date());
  const { form, isSaving, error, success, setField, save, clear, dismissMessage } = useProfileForm();

  const relationOptions = [
    'Hijo/a',
    'Padre',
    'Madre',
    'Abuelo/a',
    'Cónyuge',
    'Paciente',
    'Otro',
  ];

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
    <View style={styles.formCard}>
      {error ? (
        <MessageBanner message={error} type="error" onDismiss={dismissMessage} />
      ) : null}
      {success ? (
        <MessageBanner message={success} type="success" onDismiss={dismissMessage} />
      ) : null}
      <View style={styles.section}>
        <Text style={styles.label}>{PROFILES_STRINGS.nameLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={form.name}
          onChangeText={(value) => setField('name', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{PROFILES_STRINGS.relationLabel}</Text>
        <TouchableOpacity
          style={[styles.input, styles.selectInput]}
          activeOpacity={0.8}
          onPress={() => setIsRelationOpen(true)}
        >
          <Text style={[styles.selectText, !form.relation && styles.selectPlaceholder]}>
            {form.relation || PROFILES_STRINGS.relationPlaceholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={18}
            color="#0A5C63"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{PROFILES_STRINGS.ageLabel}</Text>
        <TouchableOpacity
          style={styles.input}
          activeOpacity={0.8}
          onPress={openDatePicker}
        >
          <Text style={form.birthDate ? styles.selectText : styles.selectPlaceholder}>
            {form.birthDate || 'Selecciona fecha'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{PROFILES_STRINGS.allergiesLabel}</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          multiline
          value={form.allergies}
          onChangeText={(value) => setField('allergies', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{PROFILES_STRINGS.doctorLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del medico"
          value={form.doctor}
          onChangeText={(value) => setField('doctor', value)}
        />
      </View>

      {showDatePicker ? (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'default'}
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      ) : null}

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.9} onPress={save} disabled={isSaving}>
          <Text style={styles.buttonPrimaryText}>{isSaving ? 'Guardando...' : PROFILES_STRINGS.save}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.9} onPress={clear} disabled={isSaving}>
          <Text style={styles.buttonSecondaryText}>{PROFILES_STRINGS.clear}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isRelationOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsRelationOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsRelationOpen(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecciona relacion</Text>
            <View style={styles.modalDivider} />
            {relationOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.selectItem, form.relation === option && styles.selectItemActive]}
                onPress={() => {
                  setField('relation', option);
                  setIsRelationOpen(false);
                }}
              >
                <Text style={styles.selectItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
