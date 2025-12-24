import { inject, Injectable, Injector } from "@angular/core";
import { CurdService } from "../core/services";
import { GridifyQuery } from "../core/models";
import { HttpClient } from "@angular/common/http";
import { CallQueueModel } from "../models/teli-caller/callQueueModel";

@Injectable({ providedIn: 'root' })
export class CallQueueService
  extends CurdService<string, CallQueueModel, CallQueueModel, GridifyQuery> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'CallQueue');
  }

}