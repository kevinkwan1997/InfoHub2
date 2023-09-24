import { Component, HostListener, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApplicationService } from './services/application/application.service';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('fade', [
  //     transition('visible => invisible', [
  //       style({ opacity: 0 }),
  //       animate(1000, style({ opacity: 1 }))
  //     ]),
  //     transition(':invisible => visible', [
  //       style({ opacity: 1 }),
  //       animate(1000, style({ opacity: 0 }))
  //     ])
  //   ])
  // ]
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
