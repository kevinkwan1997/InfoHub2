import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/application/modal.service';
import { ngIfSlideInBottomAbs, zoom, zoomAbs } from '../animations/animations';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ngIfSlideInBottomAbs,
    zoom,
    zoomAbs
  ]
})
export class MainPageComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  isModalOpen$!: Observable<boolean>;

  public ngOnInit(): void {
    this.isModalOpen$ = this.modalService.isModalContainerOpenObservable();
  }
}
