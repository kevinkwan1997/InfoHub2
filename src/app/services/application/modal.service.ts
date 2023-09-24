import { ChangeDetectorRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveModalParams, ModalComponent } from 'src/app/interface/components/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private isModalActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private activeModals$: BehaviorSubject<Record<string, ActiveModalParams>> = new BehaviorSubject({});
  private openModal$: BehaviorSubject<ActiveModalParams> = new BehaviorSubject<ActiveModalParams>({
    icon: '',
    title: '',
    component: null,
  });
  private viewContainerRef!: ViewContainerRef;

  public getOpenModal(): Observable<ActiveModalParams> {
    return this.openModal$.asObservable();
  }

  public getActiveModals(): Observable<Record<string, ActiveModalParams>> {
    return this.activeModals$.asObservable();
  }
  
  public setModalActive(params: ActiveModalParams) {
    const activeModals: Record<string, ActiveModalParams> = {...this.activeModals$.getValue()};
    if (!activeModals[params.title]) {
      activeModals[params.title] = params;
    }
    this.activeModals$.next(activeModals);
  }

  public setModalInactive(params: ActiveModalParams) {
    const activeModals = {...this.activeModals$.getValue()};
    if (activeModals[params.title]) {
      delete activeModals[params.title];
    }
    this.activeModals$.next(activeModals);
  }

  public setOpenModal$(params: ActiveModalParams): void {
    if (!this.openModal$) {
      this.openModal$ = new BehaviorSubject(params);
      return;
    }
    this.setModalActive(params);
    this.openModal$.next(params);
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
    if (!this.openModal$.getValue()) {
      return;
    }

    this.createComponentInstance();
  }

  public createComponentInstance() {
    const activeModal = this.openModal$.getValue();
    const inputs = activeModal.inputs;
    const ref = this.viewContainerRef.createComponent<ModalComponent>(activeModal.component);
    if (inputs && Object.keys(inputs).length) {
      Object.keys(inputs).forEach((key) => {
        ref.instance[key] = inputs[key];
      })
    }
    if (ref.instance.ngOnInit) {
      ref.instance.ngOnInit();
    }
    ref.injector.get(ChangeDetectorRef).detectChanges();
  }

  public isViewContainerRefSet(): boolean {
    return !!this.viewContainerRef;
  }

  public isModalActiveObservable(): Observable<boolean> {
    return this.isModalActive$.asObservable();
  }
}
