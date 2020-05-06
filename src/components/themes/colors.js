import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const defaultColors = {
  primary: '#f4f6f6',
  textTitle: '#193b4e',
  textBase: 'black',
  textBaseLight: '#4a5568',
  card: '#fff',
  chip: '#dfe9f2'
};

export default function useColors() {
  const colorScheme = useColorScheme();

  const [colors, setColors] = useState(defaultColors);

  useEffect(() => {
    if (colorScheme === 'dark') {
      const darkColors = {
        primary: '#f4f6f6',
        textTitle: '#193b4e',
        textBase: 'black',
        textBaseLight: '#4a5568',
        card: '#fff',
        chip: '#dfe9f2'
      };
      setColors(darkColors);
    } else {
      setColors(defaultColors);
    }
  }, [colorScheme]);

  return colors;
}
