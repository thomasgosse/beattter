import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import useColors from '../themes/colors';
import useVariables from '../themes/variables';

import sample from '../../store/sample';

const countries = ['Thaïlande', 'Vietnam'];

function TripListItem() {
  const colors = useColors();
  const variables = useVariables();
  const styles = getStyles(colors, variables);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const scale = toValue => {
    Animated.timing(scaleAnim, {
      toValue,
      duration: 150,
      useNativeDriver: true
    }).start();
  };
  const scaleDown = scale.bind(null, 0.98);
  const scaleUp = scale.bind(null, 1);

  let image = {
    uri: 'https://www.topuniversities.com/sites/default/files/articles/lead-images/study_in_bangkok.jpg'
  };

  const displayedCountries = countries.filter((country, index) => index < 2);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], ...styles.cardContainer }}>
      <TouchableOpacity style={styles.card} onPressIn={scaleDown} onPressOut={scaleUp} activeOpacity={0.95}>
        <Image source={image} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{sample.title}</Text>
          <Text style={styles.cardDate}>
            {new Date(sample.startDate).toLocaleDateString()} - {new Date(sample.endDate).toLocaleDateString()}
          </Text>
          <View style={styles.chipsContainer}>
            {displayedCountries.map(country => (
              <View key={country} style={styles.chip}>
                <Text style={styles.chipText}>{country}</Text>
              </View>
            ))}
            {countries.length - displayedCountries.length > 0 && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>+ {countries.length - displayedCountries.length}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function getStyles(colors, variables) {
  let cardHeight = 140;
  let imgWidth = 90;
  let imgHeight = cardHeight - 20;
  let imgLeft = -15;

  return StyleSheet.create({
    cardContainer: { width: '85%', marginBottom: 15 },
    image: {
      borderRadius: 10,
      width: imgWidth,
      height: imgHeight,
      position: 'absolute',
      top: 10,
      left: imgLeft
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: -imgLeft / 2,
      paddingLeft: 5,
      paddingRight: 10,
      backgroundColor: colors.card,
      borderRadius: 10,
      height: cardHeight,
      ...variables.shadow
    },
    cardContent: {
      marginLeft: imgWidth + imgLeft / 2,
      justifyContent: 'center'
    },
    cardTitle: {
      color: colors.textBase,
      fontSize: 18,
      fontWeight: variables.semibold,
      marginBottom: 7
    },
    cardDate: {
      marginBottom: 15,
      color: colors.textBaseLight,
      fontSize: 13
    },
    chipsContainer: { flexDirection: 'row' },
    chip: {
      backgroundColor: colors.chip,
      borderRadius: 40,
      paddingVertical: 5,
      paddingHorizontal: 7,
      marginRight: 5,
      marginBottom: 5
    },
    chipText: {
      color: colors.textBaseLight,
      fontWeight: variables.semibold
    }
  });
}

export default TripListItem;
