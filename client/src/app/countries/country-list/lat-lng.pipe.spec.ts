import { LatLngPipe } from '../../shared/lat-lng.pipe';

describe('LatLngPipe', () => {
  it('create an instance', () => {
    const pipe = new LatLngPipe();
    expect(pipe).toBeTruthy();
  });
});
