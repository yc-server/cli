import { Ycs } from '@ycs/core';
import * as config from './config';

try {
  Ycs.create(__dirname, config).start();
} catch (e) {
  console.error(e);
}
