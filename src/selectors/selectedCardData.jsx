// @flow

import { createSelectorCreator, defaultMemoize } from 'reselect'

const getSelectedCard = (state: State): Card | void => state.cards.find(card => card.isSelected);

const customSelectorCreator = createSelectorCreator(
  defaultMemoize,
  (prev, next) => {
    if (!prev && !!next) {
      return false;
    }

    if (!!prev && !next) {
      return false;
    }

    return (
      prev.data.name === next.data.name &&
      prev.isDone === next.isDone
    );
  }
)

export const selectedCardData = customSelectorCreator(
  getSelectedCard,
  card => {
    if (!card) {
      return null;
    }

    return card;
  }
);

export default selectedCardData;
