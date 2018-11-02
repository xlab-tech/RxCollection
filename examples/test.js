
import create, { createArrayObservable, createObjectObservable } from '../src';

const obj = createObjectObservable();

window.obj = obj;
obj.observer('.').subscribe(res => {
  console.log('obj', res);
});

obj.test = 'asdfaf';
obj.test = 'bbbb';
obj.eerer = 'asfasfd';
obj['tt'] = 'aaa';
obj['tt'] = 'avvv';
obj['tt'] = null;
obj.kk = 'df';
obj.kk = undefined;
delete obj.test;

const ar = createArrayObservable();
window.ar = ar;

ar.observer('.', ['remove', 'update']).subscribe(res => console.log(res));

ar.push('2');
ar.push('3');
ar.push('4');
ar.pop('4');
ar[1] = '99';

const s = new Set();
s.add('test');
const p = create(Set);
p.observer('.').subscribe(res => console.log(res));
const a = new p()
a.add('hj');

window.pp = p;