export interface ReadModel extends ReadModel1<string> { }

export interface ReadModel1<TKey> {
  id?: TKey;
}
