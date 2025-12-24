import { AlertService } from "./alert.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Result } from "../../core/models";

@Injectable({ providedIn: "root" })
export class UtilsService {
  constructor(protected alertService: AlertService, private router: Router) { }

  public parseResult(
    result: Result,
    message: string,
    redirect?: string
  ): Promise<Result> {
    if (result.failed) {
      if (result.message) {
        this.alertService.warning(result.message);
      } else {
        if (result.failures.length > 0) {
          let messages = "";

          result.failures.forEach(function (validationFailure) {
            messages +=
              messages == ""
                ? validationFailure.message
                : "<br/><br/>" + validationFailure.message;
          });

          this.alertService.warning(messages, true);
        } else {
          this.alertService.warning("Something went wrong!");
        }
      }
    } else {
      if (message) {
        this.alertService.success(message);
      }

      if (redirect) {
        this.router.navigate([redirect]);
      }
    }

    return Promise.resolve(result);
  }

  public handleError(error: any) {
    let errorMessage = "";
    if (error) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      this.alertService.error(errorMessage);
    }
    return Promise.reject(errorMessage);
  }

  public setTimeZone(date: string | number | Date | null | undefined): Date | null {
    const currentTime = new Date().toLocaleTimeString("it-IT");
    return date !== null && date !== "" && date !== undefined
      ? new Date(new Date(date).toLocaleDateString() + " " + currentTime)
      : null;
  }

  imageToFormData(image: any, name: string) {
    const base64ImageContent = image.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    const blob = this.base64ToBlob(base64ImageContent, "image/jpeg");
    const formData = new FormData();
    formData.append(name, blob);

    return formData;
  }

  base64ToBlob(base64: string, mime: string) {
    mime = mime || "";
    const sliceSize = 1024;
    const byteChars = window.atob(base64);
    const byteArrays = [];

    for (
      let offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      const slice = byteChars.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

  arrayToPairwise(arr: any[]): any[] {
    const objs = arr.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    return objs;
  }

  parseQuery(queryString: string): { [key: string]: string } {
    const query: { [key: string]: string } = {};
    const pairs = (queryString[0] === "?"
      ? queryString.substr(1)
      : queryString
    ).split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }
}
