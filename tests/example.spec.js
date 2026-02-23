// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3030/");

  /**
   *
   * The aria snapshot of the element is. this:
   *  ```
   * - combobox:
   *   - option "Value 1"
   *   - option "Value 2" [selected]
   *   - option "Value 3"
   * ```
   */

  // Should PASS. The snapshot claims option 1 is selected, but that is false.
  // The tests asserts that the snapshots are not matching.
  await expect(page.getByRole("combobox")).not.toMatchAriaSnapshot(`
    - combobox:
      - /children: deep-equal
      - option "Value 1" [selected]
      - option "Value 2"
      - option "Value 3"
  `);

  // Should PASS. The snapshot is identical to the aria snapshot in the
  // playwright UI.
  await expect(page.getByRole("combobox")).toMatchAriaSnapshot(`
    - combobox:
      - /children: deep-equal
      - option "Value 1"
      - option "Value 2" [selected]
      - option "Value 3"
  `);

  // Should FAIL. The snapshot does not contain the `[selected]` property.
  await expect(page.getByRole("combobox")).not.toMatchAriaSnapshot(`
    - combobox:
      - /children: deep-equal
      - option "Value 1"
      - option "Value 2"
      - option "Value 3"
  `);
});
