import { HttpParams } from "@angular/common/http";


export class BaseService {
  protected generateGridParams(
    params: any,
    httpParams = new HttpParams()
  ): HttpParams {
    Object.keys(params)
      .filter((key) => {
        let v = params[key];
        return Array.isArray(v) || typeof v === 'string'
          ? v.length > 0
          : v !== null && v !== undefined;
      })
      .forEach((key) => {
        let v = params[key];
        if (Array.isArray(v)) {
          Object.keys(v).forEach((key1:any) => {
            let v1 = v[key1];
            if (v1 instanceof Date) {
              httpParams = httpParams.append(
                key,
                new Date(v1).toLocaleString()
              );
            } else {
              if (key == 'orderSubStatuses' || key == 'orderStatuses') {
                httpParams = httpParams.append(key, JSON.stringify(v1));
              } else {
                httpParams = httpParams.append(key, v1);
              }
            }
          });
        } else if (v instanceof Date) {
          var d = new Date();
          var myDate = new Date(v);
          myDate.setHours(d.getHours());
          myDate.setMinutes(d.getMinutes());
          myDate.setSeconds(d.getSeconds());
          myDate.setMilliseconds(d.getMilliseconds());

          httpParams = httpParams.set(key, myDate.toISOString());
        } else {
          httpParams = httpParams.set(key, v);
        }
      });
    return httpParams;
  }

  protected generateParams(
    params: any,
    httpParams = new HttpParams()
  ): HttpParams {
    Object.keys(params)
      .filter((key) => {
        let v = params[key];
        return Array.isArray(v) || typeof v === 'string'
          ? v.length > 0
          : v !== null && v !== undefined;
      })
      .forEach((key) => {
        let v = params[key];
        if (Array.isArray(v)) {
          Object.keys(v).forEach((key1:any) => {
            let v1 = v[key1];
            if (v1 instanceof Date) {
              httpParams = httpParams.append(
                key,
                new Date(v1).toLocaleString()
              );
            } else {
              httpParams = httpParams.append(key, v1);
            }
          });
        } else if (v instanceof Date) {
          var d = new Date();
          var myDate = new Date(v);
          myDate.setHours(d.getHours());
          myDate.setMinutes(d.getMinutes());
          myDate.setSeconds(d.getSeconds());
          myDate.setMilliseconds(d.getMilliseconds());

          httpParams = httpParams.set(key, myDate.toISOString());
        } else {
          httpParams = httpParams.set(key, v);
        }
      });
    return httpParams;
  }
}
