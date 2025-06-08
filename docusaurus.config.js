// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blog do Professor Gabriel Ramos',
  tagline: 'Compartilhando conhecimento e experiências em educação',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://professorgabrielramos.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gabriel-ramos', // Usually your GitHub org/user name.
  projectName: 'blog-pessoal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gabriel-ramos/blog-pessoal/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gabriel-ramos/blog-pessoal/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogTitle: 'Blog do Professor Gabriel Ramos',
          blogDescription: 'Artigos sobre educação, metodologias de ensino e tecnologia educacional',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Posts Recentes',
          blogSidebarCount: 5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/gabriel-ramos-social-card.jpg',
      navbar: {
        title: 'Professor Gabriel Ramos',
        logo: {
          alt: 'Logo Professor Gabriel Ramos',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/social', label: 'Redes Sociais', position: 'left'},
          {to: '/admin', label: 'Admin', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Navegação',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Redes Sociais',
                to: '/social',
              },
            ],
          },
          {
            title: 'Redes Sociais',
            items: [
              {
                label: 'Instagram',
                href: 'https://instagram.com/professorgabrielramos',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/gabriel-ramos-professor',
              },
              {
                label: 'Facebook',
                href: 'https://facebook.com/professorgabrielramos',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/profgabrielramos',
              },
            ],
          },
          {
            title: 'Contato',
            items: [
              {
                label: 'Email',
                href: 'mailto:contato@professorgabrielramos.com',
              },
              {
                label: 'WhatsApp',
                href: 'https://wa.me/5511999999999',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Professor Gabriel Ramos. Construído com Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;

