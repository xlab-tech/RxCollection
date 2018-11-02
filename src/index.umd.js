import ProxyPolyfill from 'proxy-polyfill/src/proxy';
import * as RxC from './index';

if (!window.Proxy) {
  window.Proxy = ProxyPolyfill;
}

export default {
  createArrayObservable: RxC.createArrayObservable,
  createObjectObservable: RxC.createObjectObservable,
  createObservable: RxC.default,
};
