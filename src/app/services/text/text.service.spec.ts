import { TestBed } from '@angular/core/testing';

import { TextReplaceService } from './text-replace.service';

describe('TextReplaceService', () => {
  let service: TextReplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextReplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('replace', () => {
    it('should replace double braces properly', () => {
      const string = 'test{{replace}}';
      const expected = 'testing';

      expect(service.replace(string, 'ing')).toEqual(expected);
    })
  });
});
