import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from 'src/app/directives/modal.directive';
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
    private injector: Injector
  ) {
    this.modalService = this.injector.get(ModalService);
  }

  protected modalService!: ModalService;

  @ViewChild(ModalDirective, { static: true }) modal!: ModalDirective;

  public isModalActive$!: Observable<boolean>;

  public ngOnInit(): void {
    this.isModalActive$ = this.modalService.isModalActiveObservable();
  }

  public close(): void {
    this.modalService.closeContainer();
  }
}
