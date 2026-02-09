import './bootstrap';
import '../css/app.css';
import React, { JSX } from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from './layouts/Layout';

type PageWithLayout = {
  default: React.FC & {
    layout?: (page: React.JSX.Element) => React.JSX.Element;
  };
};

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true }) as Record<string, PageWithLayout>;

    const page = pages[`./Pages/${name}.tsx`];

    page.default.layout = page.default.layout || ((page: React.JSX.Element) => <Layout>{page}</Layout>);

    return page;
  },

  setup({ el, App, props }) {
    createRoot(el as HTMLElement).render(<App {...props} />);
  },
});
