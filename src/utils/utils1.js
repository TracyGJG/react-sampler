import { secondary } from './utils2';
import { tertiary } from './utils3';

function primary() {
  console.log('starting primary');
  secondary();
  tertiary();
  console.log('ending primary\n');
}

export { primary };
