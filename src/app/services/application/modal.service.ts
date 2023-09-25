import { Injectable, ComponentRef, ViewContainerRef, ViewRef } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';
import { ActiveModalParams, ModalComponent } from 'src/app/interface/components/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private baseOpenModal: ActiveModalParams = {
    icon: '',
    title: '',
    component: null,
  }
  private isModalContainerOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private activeModals$: BehaviorSubject<Record<string, ActiveModalParams>> = new BehaviorSubject({});
  private openModal$: BehaviorSubject<ActiveModalParams> = new BehaviorSubject<ActiveModalParams>(this.baseOpenModal);
  private viewContainerRef!: ViewContainerRef;
  private activeComponentRefs$: BehaviorSubject<Record<string, ComponentRef<ModalComponent>>> = new BehaviorSubject({});

  public getOpenModal(): Observable<ActiveModalParams> {
    return this.openModal$.asObservable()
      .pipe(
        tap((openModal: ActiveModalParams) => this.handleModalUpdates(openModal))
      );
  }

  public async getOpenModalValue(): Promise<ActiveModalParams> {
    return getFirstFrom(this.openModal$);
  }

  public getActiveModals(): Observable<Record<string, ActiveModalParams>> {
    return this.activeModals$.asObservable();
  }

  public async getActiveModalsValue(): Promise<Record<string, ActiveModalParams>> {
    return getFirstFrom(this.activeModals$);
  }

  public getactiveComponentRefsValue(): Promise<Record<string, ComponentRef<ModalComponent>>> {
    return getFirstFrom(this.activeComponentRefs$);
  }

  public openModal(params: ActiveModalParams): void {
    this.openModal$.next(params);
  }

  public closeModal(params: ActiveModalParams) {
    this.setModalInactive(params);
    this.openModal$.next(this.baseOpenModal);
  }

  public setViewContainerRef(ref: ViewContainerRef) {
    this.viewContainerRef = ref;
  }

  public closeContainer(): void {
    this.isModalContainerOpen$.next(false);
  }

  public openContainer(): void {
    this.isModalContainerOpen$.next(true);
  }

  public isViewContainerRefSet(): boolean {
    return !!this.viewContainerRef;
  }

  public isModalContainerOpenObservable(): Observable<boolean> {
    return this.isModalContainerOpen$.asObservable();
  }

  private handleModalUpdates(openModal?: ActiveModalParams): void {
    if (!openModal?.component) {
      return;
    }

    this.getActiveModalsValue()
      .then((activeModals) => {
        if (!activeModals[openModal.title]) {
          this.setModalActive(openModal);
        }
        this.createComponentInstance(openModal);
      });
  }

  private setModalActive(params: ActiveModalParams) {
    const activeModals: Record<string, ActiveModalParams> = {...this.activeModals$.getValue()};
    if (!activeModals[params.title]) {
      activeModals[params.title] = params;
    }
    this.activeModals$.next(activeModals);
  }

  private setModalInactive(params: ActiveModalParams) {
    const activeModals = {...this.activeModals$.getValue()};
    if (activeModals[params.title]) {
      delete activeModals[params.title];
    }
    this.activeModals$.next(activeModals);
    this.destroyComponentInstace(params);
  }

  private async createComponentInstance(openModal: ActiveModalParams): Promise<void> {
    const activeComponentRefs = await this.getactiveComponentRefsValue();
    const title = openModal.title;
    const ref = this.viewContainerRef.createComponent<ModalComponent>(openModal.component);
    if (!activeComponentRefs[title]) {
      const updated = {...activeComponentRefs};
      updated[title] = ref;
    }

    const inputs = openModal.inputs;
    if (inputs && Object.keys(inputs).length) {
      Object.keys(inputs).forEach((key) => {
        ref.instance[key] = inputs[key];
      })
    }
    if (ref.instance.ngOnInit) {
      ref.instance.ngOnInit();
      ref.changeDetectorRef.detectChanges();
    }
  }

  private async destroyComponentInstace(openModal: ActiveModalParams): Promise<void> {
    const activeComponentRefs = await this.getactiveComponentRefsValue();
    const title = openModal.title;
    if (activeComponentRefs[title]) {
      activeComponentRefs[title].destroy();
    }
  }
}
