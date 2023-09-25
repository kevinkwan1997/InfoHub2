import { Injectable } from '@angular/core';
import { Initializable } from 'src/app/interface/data/initializable';
import { HttpService } from '../../http.service';
@Injectable({
  providedIn: 'root'
})
export class AssetService implements Initializable {

  constructor(
    private httpService: HttpService
  ) { }

  public async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpService.getBlob('/assets/cloudfoot.jpg').toPromise()
        .then((image) => {
          resolve(image);
        })
    });
  }
}
