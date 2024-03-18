import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      '__test__/data.test.mjs',
      '__test__/date.test.mjs',
      '__test__/health.test.mjs',
      '__test__/interview.test.mjs',
      '__test__/normal.test.mjs',
      '__test__/number.test.mjs',
      '__test__/throttle.test.mjs',
    ],
  },
});
