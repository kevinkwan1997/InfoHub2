import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { TraceNextService } from './app/debug/trace-next.service';
import { ModalService } from './app/services/application/modal.service';
import { WeatherService } from './app/services/data/weather/weather.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    (window as any).traceNextService = moduleRef.injector.get(TraceNextService);
    (window as any).modalService = moduleRef.injector.get(ModalService);
    (window as any).weather = moduleRef.injector.get(WeatherService);
  })
  .catch(err => console.error(err));
