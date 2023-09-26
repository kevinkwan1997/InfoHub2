import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/application/modal.service';
import { ngIfFadeIn, ngIfSlideInBottom } from '../../animations/animations';
import { ActiveModalParams } from 'src/app/interface/components/modal.interface';

// All data that needs change detection will need to be an observable for this to work due to it being a dynamically generated component.
// Only async pipe and subscription will run change detection

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
    private modalService: ModalService,
  ) {}

  public isModalOpen$!: Observable<boolean>;
  public openModal$!: Observable<ActiveModalParams>;
  public activeModals$!: Observable<Record<string, ActiveModalParams>>;

  public ngOnInit(): void {
    this.isModalOpen$ = this.modalService.isModalOpen();
  }

  public close(): void {
    this.modalService.closeModal();
  }
}
