# Playwright bug repro

Contains testcase to reproduce a playwright bug where it ignores the
`[selected]` prop when using aria snapshots.

To run:

```sh
npm install
npx playwright install
npm run test
# or `npm run test -- --ui` for UI
```

See `index.html` in the `test-case` folder for more info.
