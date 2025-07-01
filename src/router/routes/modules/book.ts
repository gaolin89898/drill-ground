import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BOOK: AppRouteRecordRaw = {
  path: '/book',
  name: 'book',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.book',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 11,
  },
};

export default BOOK;
