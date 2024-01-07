import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from './navigation.service';
import { ActiveModalParams } from 'src/app/interface/components/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private navigationService: NavigationService) { }
  private isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private activeModals$: BehaviorSubject<ActiveModalParams[]> = new BehaviorSubject<ActiveModalParams[]>([]);

  public openModal(params: ActiveModalParams): void {
    this.navigationService.navigate(params.title);
    this.setModalActive(params);
    this.isModalOpen$.next(true);
  }

  public closeModal() {
    this.navigationService.navigate('');
    this.isModalOpen$.next(false);
  }

  public getActiveModals(): Observable<ActiveModalParams[]> {
    return this.activeModals$.asObservable();
  }

  public getActiveModalsValue(): ActiveModalParams[] {
    return this.activeModals$.getValue();
  }

  public setModalActive(activeModalParams: ActiveModalParams) {
    const modal = this.getActiveModalsValue().find((modal) => modal.title === activeModalParams.title);
    if (modal) {
      return;
    }
    const activeModals = [
      ...this.getActiveModalsValue(),
      activeModalParams,
    ];
    this.activeModals$.next(activeModals);
  }

  public setModalInactive(title: string) {
    const modals = this.getActiveModalsValue().filter((modal) => modal.title !== title);
    this.activeModals$.next(modals);
  }

  public isModalOpen(): Observable<boolean> {
    return this.isModalOpen$.asObservable();
  }
}
