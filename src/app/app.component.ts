import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from './services/application/application.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private applicationService: ApplicationService,
    public injector: Injector
  ) { }

  public isApplicationLoaded$!: Observable<boolean>;

  ngOnInit(): void {
    this.isApplicationLoaded$ = this.applicationService.isApplicationLoaded();
  }

  onLayoutUpdated(event: any) {
    console.log(event);
  }
}
