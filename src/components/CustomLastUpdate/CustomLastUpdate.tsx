import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import { CustomFrontMatter } from '../../types';
import { checkLastUpdateAvailability } from './utils/checkLastUpdateAvailability';
import { NBSP } from '../../constants';

export const enum CustomLastUpdateType {
  Tag = 'tag',
  Text = 'text',
}

interface CustomLastUpdateProps {
  lastUpdatedAt: number;
  type: CustomLastUpdateType;
  frontMatter: CustomFrontMatter;
  id: string;
}

const UpdateMark = (): JSX.Element => <div className="w-2 h-2 bg-blue-600 rounded-full" />;
const NewMark = (): JSX.Element => <div className="w-2 h-2 bg-green-600 rounded-full" />;

export const CustomLastUpdate = ({
  id = '',
  lastUpdatedAt,
  frontMatter = {},
  type = CustomLastUpdateType.Tag,
}: CustomLastUpdateProps): JSX.Element => {
  const { i18n } = useDocusaurusContext();

  const isRuLocale = i18n.currentLocale === 'ru';

  if (!checkLastUpdateAvailability(id, frontMatter)) {
    return null;
  }

  const isNewArticle = frontMatter.recent_article?.new;

  const isNewTag = type === CustomLastUpdateType.Tag && isNewArticle;
  const isUpdateTag = type === CustomLastUpdateType.Tag && !isNewArticle;
  const isNewText = type === CustomLastUpdateType.Text && isNewArticle;
  const isUpdateText = type === CustomLastUpdateType.Text && !isNewArticle;

  return (
    <div
      className={clsx('rounded-sm py-0.5 text-xs font-normal w-fit', {
        'mb-3 px-1.5': type === CustomLastUpdateType.Tag,
        'text-emerald-700 bg-green-100': isNewTag,
        'text-blue-500 bg-blue-50': isUpdateTag,
        'text-gray-800 italic pl-0.5': type === CustomLastUpdateType.Text,
      })}
    >
      <div className="flex flex-row">
        <div className="flex gap-1.5 items-center">
          {isUpdateText && <UpdateMark />}
          {isNewText && <NewMark />}

          {isNewArticle
            ? translate({ id: 'lastUpdated.createDate', message: 'Опубликовано:' })
            : translate({ id: 'lastUpdated.atDate', message: 'Обновлено:' })}

          {NBSP}
        </div>

        <time dateTime={new Date(lastUpdatedAt).toISOString()}>
          {new Intl.DateTimeFormat(i18n.currentLocale, {
            day: 'numeric',
            month: 'long',
            year: isRuLocale ? undefined : 'numeric',
            timeZone: 'UTC',
          }).format(lastUpdatedAt)}

          {NBSP}

          {isRuLocale &&
            new Intl.DateTimeFormat('ru', {
              year: 'numeric',
            }).format(lastUpdatedAt)}
        </time>
      </div>
    </div>
  );
};
