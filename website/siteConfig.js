// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const repoUrl = 'https://github.com/gcanti/fp-ts';

const siteConfig = {
  title: 'fp-ts' /* title for your website */,
  tagline: 'Functional programming in TypeScript ',
  url: 'https://gcanti.github.io',
  baseUrl: '/fp-ts/',
  projectName: 'fp-ts',
  organizationName: 'gcanti',
  repoUrl,
  headerLinks: [
    {doc: 'index', label: 'Documentation'},
    {href: repoUrl, label: 'GitHub', external: true},
  ],
  headerIcon: 'img/fp-ts-logo.png',
  footerIcon: 'img/fp-ts-logo.png',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#2F75C0',
    secondaryColor: '#205C3B',
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Giulio Canti',
  highlight: { theme: 'github' },
  onPageNav: 'separate',
  ogImage: 'img/fp-ts-logo.png',
  twitterImage: 'img/fp-ts-logo.png',
  editUrl: 'https://github.com/gcanti/fp-ts/edit/master/docs/'
};

module.exports = siteConfig;
