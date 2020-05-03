import { useState } from 'react';

const defaultStyle = {
  bold: '700'
};

export default function useStyles() {
  const [styles] = useState(defaultStyle);

  return styles;
}
