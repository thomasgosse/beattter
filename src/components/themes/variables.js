import { useState } from 'react';

const defaultVariables = {
  semibold: '600',
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  }
};

export default function useVariables() {
  const [variables] = useState(defaultVariables);

  return variables;
}
