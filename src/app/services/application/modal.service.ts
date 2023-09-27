import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private navigationService: NavigationService) { }
  private isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public openModal(route: string): void {
    this.navigationService.navigate(route);
    this.isModalOpen$.next(true);
  }

  public closeModal() {
    this.navigationService.navigate('');
    this.isModalOpen$.next(false);
  }

  public isModalOpen(): Observable<boolean> {
    return this.isModalOpen$.asObservable();
  }
}
