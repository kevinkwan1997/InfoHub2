import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { slideInLeft } from '../../animations/animations';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInLeft]
})
export class MenuComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
  ) { }

  @ViewChild('options', { read: ElementRef, static: false }) options!: ElementRef;
  @ViewChild('button', { read: ElementRef, static: false }) button!: ElementRef;

  public ngOnInit(): void {
    this.applicationService.getDocumentClickedTarget()
      .subscribe((target) => {
        if (!this.button) {
          return;
        }
        if (this.button.nativeElement.contains(target) && !this.isOptionsShown$.getValue()) {
          this.openMenu();
          return;
        }
        if (!this.options.nativeElement.contains(target) && this.isOptionsShown$.getValue()) {
          this.closeMenu();
          return;
        }
      })
  }

  public isOptionsShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public openMenu(): void {
    this.isOptionsShown$.next(true);
  }

  public closeMenu(): void {
    this.isOptionsShown$.next(false);
  }
}
