import { Observable, firstValueFrom } from 'rxjs';

export async function getFirstFrom<T>(observable: Observable<T>): Promise<T> {
    return await firstValueFrom<T>(observable);
}