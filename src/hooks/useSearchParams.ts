import useIsBrowser from '@docusaurus/useIsBrowser';

export const useSearchParams = () => {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  const queryParams = new URLSearchParams(window.location.search);

  return queryParams;
};
