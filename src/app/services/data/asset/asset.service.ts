import { Injectable } from '@angular/core';
import { Initializable } from 'src/app/interface/data/initializable';
import { HttpService } from '../../http.service';
import { SafeUrl } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AssetService implements Initializable {

  constructor(
    private httpService: HttpService
  ) { }

  public async init(): Promise<boolean> {
    return Promise.resolve(true); // TODO: preload images
  }

  public async getImage(path: string): Promise<SafeUrl> {
    return new Promise((resolve, reject) => {
      this.httpService.getBlob(path).toPromise()
        .then((image) => {
          resolve(image);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}
