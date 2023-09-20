import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { KtdGridCompactType, KtdGridLayout, KtdGridComponent, ktdTrackById } from '@katoid/angular-grid-layout';
import { Subscription, debounceTime, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainGridComponent {
  @ViewChild(KtdGridComponent, {static: true}) grid!: KtdGridComponent;
  // Grid data
  public cols: number = 4;
  public rowHeight: number | 'fit' = 'fit';
  public layout: KtdGridLayout = [
    {id: '0', x: 0, y: 0, w: 2, h: 2},
    {id: '1', x: 2, y: 0, w: 2, h: 2},
    {id: '2', x: 0, y: 2, w: 2, h: 2, minW: 2, minH: 2},
    {id: '3', x: 2, y: 2, w: 2, h: 2, minW: 2, maxW: 2, minH: 2, maxH: 2},
  ];
  public trackById = ktdTrackById;
  public layoutSizes: { [id: string]: [number, number] } = {};
  public height = window.innerHeight;
  public compactType: KtdGridCompactType = 'horizontal';
  public scrollableParent = 'main-grid';

  private resizeSubscription!: Subscription;

  ngOnInit() {
    this.rowHeight = window.innerHeight / 4;
    this.resizeSubscription = merge(
        fromEvent(window, 'resize'),
        fromEvent(window, 'orientationchange')
    ).pipe(
        debounceTime(50)
    ).subscribe(() => {
        this.rowHeight = window.innerHeight / 4;
        this.grid.resize();
        this.calculateLayoutSizes();
    });
  }

  private calculateLayoutSizes() {
    const gridItemsRenderData = this.grid.getItemsRenderData();
    this.layoutSizes =
        Object.keys(gridItemsRenderData)
            .reduce((acc, cur) => ({
                ...acc,
                [cur]: [gridItemsRenderData[cur].width, gridItemsRenderData[cur].height]
        }), {});
  }

  public onLayoutUpdated(layout: KtdGridLayout) {
    this.layout = layout;
    this.calculateLayoutSizes();
  }

}
