import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const defaultColors = {
  header: '#f4f6f6',
  body: '#fff',
  textTitle: '#193b4e',
  textTitleLighter: '#2b4f63',
  textBase: '#41474f',
  textBaseLight: '#909ba6',
  divider: '#e1e6eb',
  chip: '#BAA77D',
  disabled: 'grey',
  danger: 'red',
};

const defaultVariables = {
  font: {
    size: 16,
    normal: '400',
    semibold: '600',
    bold: '700',
  },
  hiddenItemWidth: 80,
  listItemHeight: 80,
};

export default function useColors() {
  const colorScheme = useColorScheme();

  const [colors, setColors] = useState(defaultColors);
  const [variables] = useState(defaultVariables);

  useEffect(() => {
    if (colorScheme === 'dark') {
      const darkColors = {
        header: '#f4f6f6',
        body: '#fff',
        textTitle: '#193b4e',
        textBase: 'black',
        textBaseLight: '#4a5568',
        divider: '#aeb5bd',
        chip: '#dfe9f2',
        disabled: 'grey',
      };
      setColors(darkColors);
    } else {
      setColors(defaultColors);
    }
  }, [colorScheme]);

  return { colors, variables };
}
