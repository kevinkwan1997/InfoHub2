import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { HttpService } from '../../http.service';
import { SafeUrl } from '@angular/platform-browser';
import { WeatherIndication } from 'src/app/enum/weather';
import { LogService } from '../../log.service';
@Injectable({
  providedIn: 'root'
})
export class AssetService implements Initializable {

  constructor(
    private httpService: HttpService,
    private logService: LogService,
  ) { }

  private loadedImages!: Record<WeatherIndication, string>;

  public async init(): Promise<InitializableReturnValue> {
    this.loadedImages = <Record<WeatherIndication, string>>{};
    const baseAssetPath = '/assets/'
    for (let key of Object.keys(WeatherIndication)) {
      let url;
      try {
        url = await this.requestImage(baseAssetPath + key + '.jpg');
        const image = this.httpService.getImageFromBlob(url);
        this.loadedImages[<WeatherIndication>key] = this.getNgStyleUrl(image);
      } catch (error) {
        this.logService.error(AssetService.name, 'Failed to load asset. Response: ', error);
      }
    }
    return Promise.resolve({
      serviceName: AssetService.name,
      status: true,
    });
  }

  public async requestImage(path: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.httpService.getBlob(path).toPromise()
        .then((image) => {
          resolve(image.body);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public getImageUrl(indication: WeatherIndication): string {
    const upperCase = <WeatherIndication>indication.toUpperCase();
    return this.loadedImages[upperCase];
  }

  public getNgStyleUrl(url: any) {
    return `url("${url.changingThisBreaksApplicationSecurity}")`;
  }
}
