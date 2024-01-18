import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default async function tailwindPlugin() {
  return {
    name: 'docusaurus-tailwindcss',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(tailwindcss);
      postcssOptions.plugins.push(autoprefixer);

      return postcssOptions;
    },
  };
}
