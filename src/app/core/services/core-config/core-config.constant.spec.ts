import { inject, TestBed } from '@angular/core/testing';
import { coreConfigConstant } from './core-config.constant';

describe('Core Config', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      coreConfigConstant
    ]}));

});
