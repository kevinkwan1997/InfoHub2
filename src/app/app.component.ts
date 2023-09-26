import { Component, HostListener, Injector } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApplicationService } from './services/application/application.service';
import { ModalService } from './services/application/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private applicationService: ApplicationService,
    private modalService: ModalService,
    public injector: Injector
  ) { }

  @HostListener ('document:click', ['$event'])
  documentClick(event: any): void {
    this.applicationService.setDocumentClickedTarget$(event.target)
  }

  public isModalOpen$!: Observable<boolean>;

  public isApplicationLoaded$!: Observable<boolean>;
  public fadeState: string = 'visible';

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.isModalOpen();
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
