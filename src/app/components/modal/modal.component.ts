import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/application/modal.service';
import { ngIfFadeIn, ngIfSlideInBottom, routeFadeIn } from '../../animations/animations';
import { Location } from '@angular/common';

// All data that needs change detection will need to be an observable for this to work due to it being a dynamically generated component.
// Only async pipe and subscription will run change detection

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ngIfFadeIn,
    ngIfSlideInBottom,
    routeFadeIn,
  ]
})
export class ModalComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private location: Location,
  ) {}

  public isModalOpen$!: Observable<boolean>;
  public url!: string;

  public ngOnInit(): void {
    this.isModalOpen$ = this.modalService.isModalOpen();
    this.location.onUrlChange((url, state) => {
      this.url = url.replace('/', '');
    })
  }

  public close(): void {
    this.modalService.closeModal();
  }
}
