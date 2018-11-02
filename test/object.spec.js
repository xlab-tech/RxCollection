/* global describe,it */
import { expect } from 'chai';
import { createObjectObservable } from '../src/index';

describe('Object', () => {
  it('create not params', () => {
    const obj = createObjectObservable();
    return expect(obj).to.be.empty;
  });
  it('create from object', () => {
    const obj = createObjectObservable({ test: 'aa' });
    return expect(obj).to.have.property('test');
  });
});
