import { createSelectorCreator, defaultMemoize } from 'reselect'

const getSelectedCard = state => state.cards.find(card => card.isSelected);

// We'll have a new cardData ONLY when the card change the name. Just that.
// In any other moment, the card should be considered as it didn't changed.
const customSelectorCreator = createSelectorCreator(
  defaultMemoize,
  (prev, next) => {
    if (!prev && !!next) {
      return false;
    }

    if (!!prev && !next) {
      return false;
    }

    if (!prev && !next) {
      return true;
    }

    return prev.data.name === next.data.name;
  }
)

export const selectedCard = customSelectorCreator(
  getSelectedCard,
  card => {
    if (!card) {
      return null;
    }

    return card.data.name;
  }
);

export default selectedCard;
