import { filter } from 'rxjs/internal/operators/filter';

const clone = obj => (Array.isArray(obj) ? [...obj] : { ...obj });
const isObjectOrArray = obj => obj === Object(obj) || Array.isArray(obj);

const getHandler = (_actionsSubject, _parent = '') => ({
  deleteProperty: (target, property) => {
    const oldValue = target[property];
    const oldTarget = clone(target);
    const res = Reflect.set(target, property);
    _actionsSubject.next({
      property: `${_parent}${property}`,
      newValue: null,
      oldValue,
      operation: 'remove',
      oldTarget,
      newTarget: clone(target),
    });
    return res;
  },
  set: (target, property, value) => {
    if (property === 'observer') {
      throw new Error('observer is a function');
    }
    const oldValue = target[property];
    const oldTarget = clone(target);
    const newValue = isObjectOrArray(value) ? new Proxy(value, getHandler(_actionsSubject, `${_parent}${property}#`)) : value;
    const res = Reflect.set(target, property, newValue);
    let operation = 'add';

    if (newValue === undefined) {
      operation = 'remove';
    } else if (oldValue) {
      operation = 'update';
    }
    const hasBarProperty = Array.prototype[property] !== undefined;
    if (!hasBarProperty) {
      _actionsSubject.next({
        property: `${_parent}${property}`,
        newValue: value,
        oldValue,
        operation,
        oldTarget,
        newTarget: clone(target),
      });
    }
    return res;
  },
  get: (target, property, receiver) => {
    if (property === 'observer') {
      return (filterReg = '.', operations = ['add', 'update', 'remove']) => _actionsSubject.pipe(
        filter(res => operations.includes(res.operation)),
        filter(res => res.property.match(filterReg)),
      );
    }
    return Reflect.get(target, property, receiver);
  },
});

export default getHandler;
