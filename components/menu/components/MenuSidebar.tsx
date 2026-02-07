import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { menuStyles as styles } from '../styles/menu.styles';
import { MENU_CONFIG } from '../constants/menu.constants';
import { useMenuUser } from '../hooks/useMenuUser';

export const MenuSidebar: React.FC = () => {
  const { name } = useMenuUser();

  return (
    <>
      <View style={styles.sidebarHeader}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.sidebarTitle}>Hola,</Text>
          <Text style={styles.sidebarSubtitle}>{name}</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="account-outline" size={MENU_CONFIG.iconSize} style={styles.icon} />
          <Text style={styles.menuLabel}>Perfil</Text>
        </View>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="help-circle-outline" size={MENU_CONFIG.iconSize} style={styles.icon} />
          <Text style={styles.menuLabel}>Ayuda</Text>
        </View>
        <View style={styles.menuFooter}>
          <View style={styles.divider} />
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="logout" size={MENU_CONFIG.iconSize} style={styles.icon} />
            <Text style={styles.menuLabel}>Cerrar sesion</Text>
          </View>
        </View>
      </View>
    </>
  );
};
