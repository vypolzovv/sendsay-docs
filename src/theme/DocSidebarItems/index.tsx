import React, { memo } from 'react';
import DocSidebarItem from '@theme/DocSidebarItem';
import { DocSidebarItemsExpandedStateProvider } from '@docusaurus/theme-common';

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
const DocSidebarItems = ({ items, ...props }) => (
  <DocSidebarItemsExpandedStateProvider>
    {items.map((item, index) => {
      if (item.label === 'en') {
        return null;
      }

      return <DocSidebarItem key={index} item={item} index={index} {...props} />;
    })}
  </DocSidebarItemsExpandedStateProvider>
); // Optimize sidebar at each "level"

export default memo(DocSidebarItems);
