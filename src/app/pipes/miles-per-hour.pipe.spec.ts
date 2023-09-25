import { MilesPerHourPipe } from './miles-per-hour.pipe';

describe('MilesPerHourPipe', () => {
  it('create an instance', () => {
    const pipe = new MilesPerHourPipe();
    expect(pipe).toBeTruthy();
  });
});
