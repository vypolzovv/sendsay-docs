import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import { Feedback } from '../../../components/Feedback';

type Props = WrapperProps<typeof FooterType>;

const FooterWrapper = (props: Props): JSX.Element => (
  <>
    <Feedback />

    <Footer {...props} />
  </>
);

export default FooterWrapper;
