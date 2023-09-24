import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/application/modal.service';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  public isModalActive$!: Observable<boolean>;

  public ngOnInit(): void {
    this.isModalActive$ = this.modalService.isModalActiveObservable();
  }
}
