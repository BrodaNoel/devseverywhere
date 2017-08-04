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

    if (!prev && !next) {
      return true;
    }

    return (
      prev.data.name === next.data.name &&
      prev.metrics.tweetsCount === next.metrics.tweetsCount
    );
  }
)

export const selectedCardMetrics = customSelectorCreator(
  getSelectedCard,
  card => {
    if (!card) {
      return null;
    }

    return card.metrics;
  }
);

export default selectedCardMetrics;
