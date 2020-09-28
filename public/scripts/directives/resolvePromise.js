import { directive } from 'https://unpkg.com/lit-html?module';

const resolvePromise = directive((promise) => (part) => {
  part.setValue('Loading...');

  Promise.resolve(promise).then((resolvedValue) => {
    part.setValue(resolvedValue);
    part.commit();
  });
});

export default resolvePromise;
