import { Injectable } from '@angular/core';
import { Initializable } from 'src/app/interface/data/initializable';
import { HttpService } from '../../http.service';
import { SafeUrl } from '@angular/platform-browser';
import { WeatherIndication } from 'src/app/enum/weather';
@Injectable({
  providedIn: 'root'
})
export class AssetService implements Initializable {

  constructor(
    private httpService: HttpService
  ) { }

  private loadedImages!: Record<WeatherIndication, SafeUrl>;

  public async init(): Promise<boolean> {
    this.loadedImages = <Record<WeatherIndication, SafeUrl>>{};
    const baseAssetPath = '/assets/'
    for (let key of Object.keys(WeatherIndication)) {
      const url = await this.getImage(baseAssetPath + key + '.jpg');
      this.loadedImages[<WeatherIndication>key] = url;
    }
    return Promise.resolve(true); // TODO: preload images
  }

  public async getImage(path: string): Promise<SafeUrl> {
    return new Promise((resolve, reject) => {
      this.httpService.getBlob('/assets/bg.jpg').toPromise()
        .then((image) => {
          resolve(image);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}
