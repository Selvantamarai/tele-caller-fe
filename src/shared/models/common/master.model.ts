import { ReadModel1 } from './read.model';

export interface MasterModel extends MasterModel1<string> { }

export interface MasterModel1<TKey> extends ReadModel1<TKey> { }
