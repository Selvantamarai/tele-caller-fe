import { HttpClient } from "@angular/common/http";
import { Optional, Inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { BaseService } from "./base.service";
import { ExcelUploadResult, GridResult, Result, Result1 } from "../models";
import { API_BASE_URL } from "../constants";


export interface ICurdService<TKey, TReadModel, TModel, TQueryModel> {
  get(query: TQueryModel): Observable<GridResult<TReadModel>>;
  getData(query: TQueryModel): Observable<GridResult<TReadModel>>;
  getCheckStatus(query: TQueryModel): Observable<GridResult<TReadModel>>;
  getProducerQuickView(query: TQueryModel): Observable<GridResult<TReadModel>>;
  GetUserRoles(query: TQueryModel): Observable<GridResult<TReadModel>>;
  getClone(query: TQueryModel): Observable<GridResult<TReadModel>>;
  getCount(query: TQueryModel): Observable<number>;
  getById(id: TKey): Observable<TModel>;
  create(model: TModel): Observable<Result1<TKey>>;
  update(model: TModel): Observable<Result>;
  delete(id: TKey): Observable<Result>;
  bulkDelete(ids: TKey[]): Observable<Result>;
  bulkInsert(models: TModel[]): Observable<Result1<TKey[]>>;
  bulkUpdate(models: TModel[]): Observable<Result>;
  uploadExcelTemplate(
    data: FormData,
    id: string
  ): Observable<ExcelUploadResult>;

  downloadLogsPdf(userId: string, heading: string): Observable<any>;
}

export class CurdService<TKey, TReadModel, TModel, TQueryModel>
  extends BaseService
  implements ICurdService<TKey, TReadModel, TModel, TQueryModel>
{
  protected get url(): string {
    return `${this.endpoint}`;
  }

  constructor(protected httpClient: HttpClient, protected endpoint: string, @Optional() @Inject(API_BASE_URL) protected readonly apiUrl?: string) {
    super();
    this.endpoint = 'https://localhost:5130/api/v1/'+endpoint
  }

  get(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(`${this.url}`, {
      params: this.generateGridParams(query),
    });
  }
  getData(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(`${this.url}/GetData`, {
      params: this.generateGridParams(query),
    });
  }
  getCheckStatus(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(
      `${this.url}/GetCheckInStatus`,
      {
        params: this.generateGridParams(query),
      }
    );
  }

  getProducerQuickView(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(
      `${this.url}/getProducerQuickView`,
      {
        params: this.generateGridParams(query),
      }
    );
  }

  GetUserRoles(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(
      `${this.url}/GetUserRoles`,
      {
        params: this.generateGridParams(query),
      }
    );
  }


  getClone(query: TQueryModel): Observable<GridResult<TReadModel>> {
    return this.httpClient.get<GridResult<TReadModel>>(
      `${this.url}/GetCloneData`,
      {
        params: this.generateGridParams(query),
      }
    );
  }

  getCount(query: TQueryModel): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/GetCount`, {
      params: this.generateGridParams(query),
    });
  }

  getById(id: TKey): Observable<TModel> {
    return this.httpClient.get<TModel>(`${this.url}/GetById/${id}`);
  }

  create(model: TModel): Observable<Result1<TKey>> {
    return this.httpClient.post<Result1<TKey>>(`${this.url}`, model);
  }

  update(model: TModel): Observable<Result> {
    return this.httpClient.put<Result>(`${this.url}`, model);
  }

  delete(id: TKey): Observable<Result> {
    return this.httpClient.delete<Result>(`${this.url}/${id}`);
  }

  bulkDelete(ids: TKey[]): Observable<Result> {
    return this.httpClient.post<Result>(`${this.url}/BulkDelete`, ids);
  }

  bulkInsert(models: TModel[]): Observable<Result1<TKey[]>> {
    return this.httpClient.post<Result1<TKey[]>>(
      `${this.url}/BulkInsert`,
      models
    );
  }

  bulkUpdate(models: TModel[]): Observable<Result> {
    return this.httpClient.post<Result>(`${this.url}/BulkUpdate`, models);
  }

  updateActiveStatus(models: any[]): Observable<Result> {
    return this.httpClient.post<Result>(`${this.url}/UpdateActiveStatus`, models);
  }

  uploadExcelTemplate(
    data: FormData,
    id: string
  ): Observable<ExcelUploadResult> {
    return this.httpClient.post<ExcelUploadResult>(
      `${this.url}/UploadExcelTemplate/${id}`,
      data
    );
  }
  downloadLogsPdf(userId: string, heading: string) {
    return this.httpClient
      .get(`${this.url}/DownloadLogsPdf/${userId}/${heading}`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((res:any) => {
          var contentDisposition : any = res.headers.get('content-disposition');
          var filename =
            contentDisposition !== undefined
              ? contentDisposition
                .split(';')[1]
                .split('filename')[1]
                .split('=')[1]
                .trim()
              : '';
          let data = {
            file: new Blob([res.body], {
              type: res.headers.get('Content-Type'),
            }),
            filename: filename,
          };
          return data;
        })
      );
  }

}
