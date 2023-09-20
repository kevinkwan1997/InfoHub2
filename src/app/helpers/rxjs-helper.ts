import { Observable, firstValueFrom } from 'rxjs';

export async function getFirstFrom<T>(observable: Observable<T>) {
    return firstValueFrom(observable);
}