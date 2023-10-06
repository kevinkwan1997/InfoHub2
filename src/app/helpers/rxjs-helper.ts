import { Observable, take } from 'rxjs';

export async function getValue<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve) => {
        observable
            .pipe(take(1))
            .subscribe((result) => {
                resolve(result);
            })
    });
}