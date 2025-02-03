import { DocFrontMatter } from '../plugins/docs-plugin-extended';

interface Window {
  dataLayer: object[];
  gtag: (arg: unknown) => void;
}

interface CustomFrontMatter extends DocFrontMatter {
  recent_article?: {
    ignore: boolean;
    new: boolean;
  };
  feedback_ignore?: boolean;
}
