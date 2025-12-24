export interface LookupItem extends LookupItem1<string> {}

export interface LookupItem1<TValue> {
  value: TValue;
  text: string;
  selected: boolean;
  title?: string;
  providerId?: string;
}
