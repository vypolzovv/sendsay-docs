import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc, type DocContextValue } from '@docusaurus/plugin-content-docs/client';
import { WrapperProps } from '@docusaurus/types';
import type FooterType from '@theme/DocItem/Footer';
import LastUpdated from '@theme/LastUpdated';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline, { type Props as TagsListInlineProps } from '@theme/TagsListInline';
import { Feedback } from '../../../components/Feedback';
import { useSearchParams } from '../../../hooks';
import styles from './styles.module.css';

const TagsRow = (props: TagsListInlineProps) => (
  <div className={clsx(ThemeClassNames.docs.docFooterTagsRow, 'row margin-bottom--sm')}>
    <div className="col">
      <TagsListInline {...props} />
    </div>
  </div>
);

type EditMetaRowProps = Pick<
  DocContextValue['metadata'],
  'editUrl' | 'lastUpdatedAt' | 'lastUpdatedBy' | 'formattedLastUpdatedAt'
>;
const EditMetaRow = ({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}: EditMetaRowProps) => {
  const queryParams = useSearchParams();

  const isEditorMode = queryParams && queryParams.get('edit') === 'true';

  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      {isEditorMode && <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>}

      {false && (
        <div className={clsx('col', styles.lastUpdated)}>
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        </div>
      )}
    </div>
  );
};

const DocItemFooter = (): JSX.Element | null => {
  const { metadata } = useDoc();

  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy, tags } = metadata;

  const canDisplayTagsRow = tags.length > 0;

  const canDisplayEditMetaRow = Boolean(editUrl || lastUpdatedAt || lastUpdatedBy);

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}

      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  );
};

type Props = WrapperProps<typeof FooterType>;

const DocItemFooterWrapper = (props: Props): JSX.Element => (
  <>
    <Feedback />

    <DocItemFooter {...props} />
  </>
);

export default DocItemFooterWrapper;
