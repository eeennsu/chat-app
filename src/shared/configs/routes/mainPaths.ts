// import { IPathSlug } from '@typings/commons';
import { IPathSlug } from '@shared/typings/commons';

// import { LIST_PAGE_ROUTE } from './consts';

export const MAIN_PATHS = {
  root: '/' as const,
  home() {
    return MAIN_PATHS.root;
  },
  auth: {
    root() {
      return MAIN_PATHS.root.concat('auth');
    },
    login() {
      return MAIN_PATHS.auth.root().concat('/login');
    },
    register() {
      return MAIN_PATHS.auth.root().concat('/register');
    },
  },
  rooms: {
    root() {
      return MAIN_PATHS.root.concat('rooms');
    },
    new() {
      return MAIN_PATHS.rooms.root().concat('/new');
    },
    slug({ slug }: IPathSlug) {
      return MAIN_PATHS.rooms.root().concat(`/${slug}`);
    },
  },
  // about() {
  //   return MAIN_PATHS.root.concat('about');
  // },
  // product: {
  //   root() {
  //     return MAIN_PATHS.root.concat('product');
  //   },
  //   bread: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/bread');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.bread.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.bread.root().concat(`/${slug}`);
  //     },
  //   },
  //   sauce: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/sauce');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.sauce.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.sauce.root().concat(`/${slug}`);
  //     },
  //   },
  //   dish: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/dish');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.dish.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.dish.root().concat(`/${slug}`);
  //     },
  //   },
  //   drink: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/drink');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.drink.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.drink.root().concat(`/${slug}`);
  //     },
  //   },
  //   dessert: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/dessert');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.dessert.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.dessert.root().concat(`/${slug}`);
  //     },
  //   },
  //   bundle: {
  //     root() {
  //       return MAIN_PATHS.product.root().concat('/bundle');
  //     },
  //     list() {
  //       return MAIN_PATHS.product.bundle.root().concat(LIST_PAGE_ROUTE);
  //     },
  //     detail({ slug }: IPathSlug) {
  //       return MAIN_PATHS.product.bundle.root().concat(`/${slug}`);
  //     },
  //   },
  // },
  // event: {
  //   root() {
  //     return MAIN_PATHS.root.concat('event');
  //   },
  //   list() {
  //     return MAIN_PATHS.event.root().concat(LIST_PAGE_ROUTE);
  //   },
  //   detail({ slug }: IPathSlug) {
  //     return MAIN_PATHS.event.root().concat(`/${slug}`);
  //   },
  // },
} as const;
