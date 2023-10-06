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

  private loadedNgStyleImages!: Record<WeatherIndication, string>;
  private loadedImageUrls!: Record<WeatherIndication, SafeUrl>;

  public async init(): Promise<InitializableReturnValue> {
    this.loadedNgStyleImages = <Record<WeatherIndication, string>>{};
    this.loadedImageUrls = <Record<WeatherIndication, SafeUrl>>{};
    const baseAssetPath = '/assets/'
    for (let key of Object.keys(WeatherIndication)) {
      let url: SafeUrl;
      try {
        url = await this.requestImage(baseAssetPath + key + '.jpg');
        const ngStyleUrl = this.getNgStyleUrl(url);
        this.loadedNgStyleImages[<WeatherIndication>key] = ngStyleUrl
        this.loadedImageUrls[<WeatherIndication>key] = url;
        this.logService.info(AssetService.name, 'Success! Loaded image: ', ngStyleUrl);
      } catch (error) {
        this.logService.error(AssetService.name, 'Failed to load asset. Response: ', error);
      }
    }
    return Promise.resolve({
      serviceName: AssetService.name,
      status: true,
    });
  }

  public async requestImage(path: string): Promise<SafeUrl> {
    return new Promise((resolve, reject) => {
      this.httpService.getBlob(path)
        .then((image) => {
          resolve(image);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public getNgStyleImageUrl(indication: WeatherIndication): string {
    const upperCase = <WeatherIndication>indication.toUpperCase();
    return this.loadedNgStyleImages[upperCase];
  }

  public getImageUrl(indication: WeatherIndication): SafeUrl {
    const upperCase = <WeatherIndication>indication.toUpperCase()
    return this.loadedImageUrls[upperCase];
  }

  public getNgStyleUrl(url: any) {
    return `url("${url.changingThisBreaksApplicationSecurity}")`;
  }
}
