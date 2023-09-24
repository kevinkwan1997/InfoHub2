import { Observable, firstValueFrom } from 'rxjs';

export async function getFirstFrom<T>(observable: Observable<T>): Promise<T> {
    return firstValueFrom<T>(observable);
}