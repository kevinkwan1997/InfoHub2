import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';
import { ActiveModalParams, ModalComponent } from 'src/app/interface/components/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private isModalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private activeModals$: BehaviorSubject<ActiveModalParams[]> = new BehaviorSubject<ActiveModalParams[]>([]);
  private activeModal$: BehaviorSubject<ActiveModalParams> = new BehaviorSubject<ActiveModalParams>({
    title: '',
    component: null,
  });
  private viewContainerRef!: ViewContainerRef;

  public getActiveModal(): Observable<ActiveModalParams> {
    return this.activeModal$;
  }
  
  public async setModalActive(viewContainerRef: ActiveModalParams) {
    let modals = await getFirstFrom(this.activeModals$);
    modals = [
      ...modals,
      viewContainerRef
    ]
    this.activeModals$.next(modals);
  }

  public setActiveModal$(params: ActiveModalParams): void {
    if (!this.activeModal$) {
      this.activeModal$ = new BehaviorSubject(params);
      return;
    }
    this.activeModal$.next(params);
  }

  public setViewContainerRef(ref: ViewContainerRef) {
    this.viewContainerRef = ref;
  }

  public closeContainer(): void {
    this.isModalActive$.next(false);
  }

  public openContainer(): void {
    this.isModalActive$.next(true);
  }

  public async openModal(): Promise<void> {
    if (!this.activeModal$.getValue()) {
      return;
    }

    this.createComponentInstance();
  }

  public createComponentInstance() {
    const activeModal = this.activeModal$.getValue();
    const inputs = activeModal.inputs;
    const ref = this.viewContainerRef.createComponent<ModalComponent>(activeModal.component);
    if (inputs && Object.keys(inputs).length) {
      Object.keys(inputs).forEach((key) => {
        ref.instance[key] = inputs[key];
      })
    }
  }

  public isViewContainerRefSet(): boolean {
    return !!this.viewContainerRef;
  }

  public isModalActiveObservable(): Observable<boolean> {
    return this.isModalActive$.asObservable();
  }
}