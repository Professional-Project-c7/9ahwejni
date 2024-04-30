import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-paper';

const MenuItems = () => {
  const [active, setActive] = React.useState('');
  const [color, setColor] = React.useState('#dba617');

  const handlePress = (section) => {
    setActive(section);
  };

  return (
    <View style={styles.container}>
      <Drawer.Section title="Some title" style={styles.drawerSection}>
        <Drawer.Item
          style={[styles.Section, active === 'first' && { backgroundColor: color }]}
          label="First Item"
          active={active === 'first'}
          onPress={() => handlePress('first')}
        />
        <Drawer.Item
          style={[styles.Section, active === 'second' && { backgroundColor: color }]}
          label="Second Item"
          active={active === 'second'}
          onPress={() => handlePress('second')}
        />
        <Drawer.Item
          style={[styles.Section, active === 'third' && { backgroundColor: color }]}
          label="Third Item"
          active={active === 'third'}
          onPress={() => handlePress('third')}
        />
        <Drawer.Item
          style={[styles.Sectionfinale, active === 'fourth' && { backgroundColor: color }]}
          label="Fourth Item"
          active={active === 'fourth'}
          onPress={() => handlePress('fourth')}
        />
      </Drawer.Section>
      <Drawer.Section style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerSection: {
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 280,
  },
  Section: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize:22
  },
  Sectionfinale: {
    fontSize:22,
    borderBottomColor: '#ccc',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MenuItems;
