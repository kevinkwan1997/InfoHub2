import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements ModalComponent, OnInit {
  @Input() public title!: string;

  public ngOnInit(): void {
    
  }
}
