import React, { useState, useContext } from 'react';
import { Dimensions, Text, StyleSheet } from 'react-native';
import { Avatar, Tooltip, ThemeContext } from 'react-native-elements';

import kinds from '../../kinds';

export default function IngredientKindTooltip({ kind, containerStyle }) {
  const [tooltipSize] = useState({ w: Dimensions.get('window').width / 2, h: 16 });
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    tooltip: {
      backgroundColor: colors.tooltip,
      color: colors.textBase,
      fontSize: 15,
      fontWeight: '500',
    },
  });

  return (
    <Tooltip
      backgroundColor={styles.tooltip.backgroundColor}
      width={tooltipSize.w + 30}
      height={tooltipSize.h + 30}
      popover={
        <Text style={styles.tooltip} numberOfLines={1}>
          {kinds[kind]?.description}
        </Text>
      }
    >
      <Avatar rounded source={kinds[kind]?.image} containerStyle={containerStyle} />
    </Tooltip>
  );
}
