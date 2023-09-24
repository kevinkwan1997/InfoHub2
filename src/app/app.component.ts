import { Component, HostListener, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  @HostListener ('document:click', ['$event'])
  documentClick(event: any): void {
    this.applicationService.setDocumentClickedTarget$(event.target)
  }

  public isApplicationLoaded$!: Observable<boolean>;
  public fadeState: string = 'visible';

  ngOnInit(): void {
    this.isApplicationLoaded$ = this.applicationService.isApplicationLoaded()
      .pipe(
        tap((isLoaded) => {
          if (isLoaded) {
            this.fadeState = 'invisible';
          }
        })
      );
  }
}
