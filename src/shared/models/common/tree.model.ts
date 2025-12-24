export interface TreeModel<T> {
  item: T;
  children: TreeModel<T>[];
}
