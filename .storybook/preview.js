require('tailwindcss/tailwind.css');

// https://storybook.js.org/docs/react/essentials/viewport
const customViewports = {
  tablet: {
    name: 'Tablet',
    styles: {
      width: '640px',
      height: '963px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1024px',
      height: '801px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '801px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: customViewports },
};
