import { getTermination } from '../../../utils';

const MESSAGE_FORMS = ['статья', 'статьи', 'статей'];

export interface DescriptionObj {
  id: string;
  message: string;
}

export const getDescriptionObj = (count: number): DescriptionObj => {
  const message = getTermination(count, MESSAGE_FORMS, true);
  const description =
    count > 1
      ? {
          message: `{count} ${message}`,
          id: 'DocCard.categoryDescription.plural',
        }
      : {
          message: `{count} ${message}`,
          id: 'DocCard.categoryDescription.single',
        };

  return description;
};
