module.exports = function pluginIframeDetected() {
  return {
    name: 'plugin-iframe-detected',

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML:
              '(function(){if(window !== window.parent){ document.documentElement.setAttribute("data-iframed", true); }})();',
          },
        ],
      };
    },
  };
};
