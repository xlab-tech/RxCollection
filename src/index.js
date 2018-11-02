import { Subject } from 'rxjs/internal/Subject';
import getHandler from './handler';

const createObservable = object => new Proxy(object, getHandler(new Subject()));
export default createObservable;
export const createArrayObservable = (object = []) => createObservable(object);
export const createObjectObservable = (object = {}) => createObservable(object);
