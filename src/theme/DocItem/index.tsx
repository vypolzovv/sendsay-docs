import React, { ComponentProps } from 'react';
import type DocItemType from '@theme/DocItem';
import DocItem from '@theme-original/DocItem';
import useIframeState from '../../hooks/useIframeState';

type Props = ComponentProps<typeof DocItemType>;

const DocItemWrapper = (props: Props): JSX.Element => {
  useIframeState(props);

  return <DocItem {...props} />;
};

export default DocItemWrapper;
