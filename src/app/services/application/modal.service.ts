import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';
import { ModalViewContainerRef } from 'src/app/interface/components/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private isModalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private activeModals$: BehaviorSubject<ModalViewContainerRef[]> = new BehaviorSubject<ModalViewContainerRef[]>([]);
  private activeModal$!: BehaviorSubject<ModalViewContainerRef>;
  
  public async setModalActive(viewContainerRef: ModalViewContainerRef) {
    let modals = await getFirstFrom(this.activeModals$);
    modals = [
      ...modals,
      viewContainerRef
    ]
    this.activeModals$.next(modals);
  }

  public isModalActiveObservable(): Observable<boolean> {
    return this.isModalActive$.asObservable();
  }

  public setActiveModal$(viewContainerRef: ModalViewContainerRef): void {
    this.activeModal$.next(viewContainerRef);
  }

  public closeContainer(): void {
    this.isModalActive$.next(false);
  }

  public openContainer(): void {
    this.isModalActive$.next(true);
  }

}
