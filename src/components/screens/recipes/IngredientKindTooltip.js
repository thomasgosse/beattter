import React, { useState } from 'react';
import { Avatar, Tooltip } from 'react-native-elements';
import { Dimensions, Text } from 'react-native';

const kinds = {
  meat: { image: require('../../../assets/meat.png'), description: 'Viandes' },
  fish: { image: require('../../../assets/fish.png'), description: 'Poissons' },
  vegetable: { image: require('../../../assets/vegetable.png'), description: 'Fruits et Légumes' },
  starchy: { image: require('../../../assets/starchy.png'), description: 'Céréales, pâtes, riz et pains' },
  'sweet-fat-product': {
    image: require('../../../assets/sweet-fat-product.png'),
    description: 'Produits gras et/ou sucrés',
  },
  'alcool-drink': { image: require('../../../assets/alcool-drink.png'), description: 'Boissons alcoolisées' },
  oil: { image: require('../../../assets/oil.png'), description: 'Huiles' },
  egg: { image: require('../../../assets/egg.png'), description: 'Œufs' },
  dairy: { image: require('../../../assets/dairy.png'), description: 'Produits Laitiers' },
  'sauce-spice-seasoning': {
    image: require('../../../assets/sauce-spice-seasoning.png'),
    description: 'Sauces, épices, assaisonnements',
  },
  'non-alcool-drink': {
    image: require('../../../assets/non-alcool-drink.png'),
    description: 'Boissons non alcoolisées',
  },
};

export default function IngredientKindTooltip({ kind }) {
  const [tooltipSize] = useState({ w: Dimensions.get('window').width / 2, h: 16 });

  return (
    <Tooltip
      width={tooltipSize.w + 30}
      height={tooltipSize.h + 30}
      popover={<Text numberOfLines={1}>{kinds[kind]?.description}</Text>}
    >
      <Avatar rounded source={kinds[kind]?.image} />
    </Tooltip>
  );
}
