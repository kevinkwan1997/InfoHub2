import { Injectable } from "@angular/core";
import { BehaviorSubject, pairwise, startWith, tap } from "rxjs";

@Injectable()
export class TraceNextService {
    private stopTrackingFunctions: Map<string, () => void> = new Map();
    private logCount: number = 0;

    public track(serviceInstance: any, serviceName: string, subjectName: string, compare = false) {
        const key = `${serviceName}.${subjectName}`;
        const subject = serviceInstance[subjectName];
        if (!this.stopTrackingFunctions.has(key)) {
            const stopTracking = this.trackBehaviorSubject(subject, key, compare);
            this.stopTrackingFunctions.set(key, stopTracking);
            this.log(`Started tracking ${key}`);
            return;
        }

        this.log(`Already tracking ${key}`);
    }

    public stopTracking(serviceName: string, subjectName: string) {
        const key = `${serviceName}.${subjectName}`;
        const stopTracking = this.stopTrackingFunctions.get(key);
        if (stopTracking) {
          stopTracking();
          this.stopTrackingFunctions.delete(key);
          this.log(`Stopped tracking ${key}`);
        } else {
          this.log(`No active tracking found for ${key}`);
        }
      }

    private trackBehaviorSubject(subject: BehaviorSubject<any>, subjectKey: string, compare: boolean) {
        const originalNext = subject.next.bind(subject);

        let subscription: any;
        if (compare) {
            subscription = subject.pipe(
                startWith(undefined),
                pairwise()
            ).subscribe(([previous, current]) => {
                this.log(`${subjectKey} \n\n`
                    + `Previous value: ${this.stringifyForLogging(previous)} \n\n`
                    + `Current value: ${this.stringifyForLogging(current)}`);
            })
        }

        subject.next = (value: any) => {
            const error = new Error();
            const stack = error.stack || '';
            const stackLines = stack.split('\n');
        
            const relevantLine = stackLines[2];
            const match = relevantLine ? relevantLine.match(/at\s+(?:[^\s]+\s+)?(?:[^\/]*\/)+([^:]+:\d+:\d+)/) : null;
            const location = match ? match[1] : 'Location unavailable';

            this.log(`${location} Called next on ${subjectKey}`);
            originalNext(value);
        }
      
        return () => {
            if (compare) {
                subscription.unsubscribe();
            }
            subject.next = originalNext; // Restore original next function when tracking is stopped
        };
    }

    private stringifyForLogging(value: any) {
        // Handle primitive types directly
        if (["string", "number", "boolean", "undefined"].includes(typeof value)) {
          return String(value);
        }
      
        // Handle null, arrays, and functions specially
        if (value === null) {
          return 'null';
        } else if (Array.isArray(value)) {
          return `Array(${value.length}): ` + JSON.stringify(value);
        } else if (typeof value === 'function') {
          return `function ${value.name}() {...}`;
        }
      
        // Handle special objects like Maps and Sets
        if (value instanceof Map) {
          const mapEntries: any[] = Array.from(value.entries()).map(([k, v]) => `[${this.stringifyForLogging(k)}] => ${this.stringifyForLogging(v)}`);
          return `Map(${value.size}): {${mapEntries.join(', ')}}`;
        }
      
        if (value instanceof Set) {
          const setValues: any[] = Array.from(value).map(v => this.stringifyForLogging(v));
          return `Set(${value.size}): {${setValues.join(', ')}}`;
        }
      
        // For regular objects and other cases, use JSON.stringify with a replacer to handle circular references
        try {
          const seen = new WeakSet();
          return JSON.stringify(value, (key, val) => {
            if (typeof val === 'object' && val !== null) {
              if (seen.has(val)) {
                return '[Circular]';
              }
              seen.add(val);
            }
            return val;
          }, 2); // Indent for readability
        } catch (error) {
          return 'Unstringifiable Object';
        }
      }

      private log(message: string) {
        this.logCount++;
        console.log(`${this.logCount} [Tracking]: ${message}`);
      }
}