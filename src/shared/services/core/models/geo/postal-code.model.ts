export interface StateModel {
  stateCode: string;
  stateName: string;
}

export interface CountyModel extends StateModel {
  countyName: string;
}

export interface ZipCodeModel extends CountyModel {
  countryCode: string;
  postalCode: string;
  placeName: string;

  countyCode: string;

  communityCode: string;
  communityName: string;

  latitude: number;
  longitude: number;
  accuracy: number;
}
