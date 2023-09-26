import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }
  private isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public openModal(): void {
    this.isModalOpen$.next(true);
  }

  public closeModal() {
    this.isModalOpen$.next(false);
  }

  public isModalOpen(): Observable<boolean> {
    return this.isModalOpen$.asObservable();
  }
}
