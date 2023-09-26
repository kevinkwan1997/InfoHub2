import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements ModalComponent, OnInit {
  @Input() public title!: string;

  public ngOnInit(): void {
    
  }
}
