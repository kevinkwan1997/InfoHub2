import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ModalDirective } from 'src/app/directive/modal.directive';
import { ModalService } from 'src/app/services/application/modal.service';
import { ngIfFadeIn, ngIfSlideInBottom } from '../animations/animations';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ngIfFadeIn,
    ngIfSlideInBottom
  ]
})
export class ModalComponent implements OnInit {
  constructor(
    protected injector: Injector
  ) {
    this.modalService = this.injector.get(ModalService);
  }

  protected modalService!: ModalService;

  @ViewChild(ModalDirective, { static: false }) set modal(modal: ModalDirective) {
    if (modal) {
      this.modalService.setViewContainerRef(modal.viewContainerRef);
      this.modalService.openModal();
    }
  };

  public isModalActive$!: Observable<boolean>;

  public ngOnInit(): void {
    this.isModalActive$ = this.modalService.isModalActiveObservable();
  }

  public close(): void {
    this.modalService.closeContainer();
  }
}
