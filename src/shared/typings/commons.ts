import { JSX } from 'react';

export type Nullable<T> = T | null;

export interface IMenuRoute {
  parentMenuName: string;
  path: string;
  menuName: string;
  order: number;
  icon?: ({ isActive }: { isActive: boolean }) => JSX.Element;
}

export interface IPathSlug {
  slug: string | number;
}

export interface IMenu {
  title: string;
  path?: string;
}

export type SubMenu = Record<string, IMenu>;

export interface IList<T> {
  page: number;
  total: number;
  items: T[];
}

export interface IAdminMenuRoute {
  path: string;
  menuName: string;
  order: number;
}

type TableItemType = string | number | boolean;
export type ITableItem = Record<string, TableItemType>;
export type TableExtraKey = 'delete';

// export type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;

interface IAuditDate {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type FilterDate<T> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & IAuditDate;
export interface IGetListParams extends Record<string, string | number> {
  page: string | number;
  pageSize: string | number;
  search?: string;
}

export type SelectItem = { label: string; value: string | number };

export type SelectProductItem = SelectItem & { price: number };
export interface ICommandGroup<T = Record<string, any>> {
  heading: SelectItem;
  items: Array<
    SelectItem & {
      selected?: boolean;
    } & T
  >;
}

export interface IListResponse {
  ok: boolean;
  data: {
    list: any[];
    totalCount: number;
    page: number;
  };
}
export interface IItemResponse {
  ok: boolean;
  data: any;
}

export type Updater<T> = (value: T | ((prev: T) => T)) => void;
export interface IPageParams {
  page: number;
  pageSize: number;
  search?: string;
}

export type ProductData<T> = Partial<T> & {
  image: string;
};
