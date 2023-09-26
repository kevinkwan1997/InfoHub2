import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';
import { ModalService } from 'src/app/services/application/modal.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements ModalComponent, OnInit {
  constructor(
    private modalService: ModalService,
  ) {
  }
  @Input() public title!: string;

  public count: string = '12345';
  public test$!: Observable<number>;

  public ngOnInit(): void {
  }
}
