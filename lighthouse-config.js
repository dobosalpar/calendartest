module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: [
      'performance',
      'accessibility',
      'seo',
      'best-practices',
    ],
    settings: {
      maxWaitForLoad: 360000,
      skipAudits: [
        'uses-http2',
      ],
    },
  },
};
