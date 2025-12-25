import { Page, expect } from "@playwright/test";

export class BillsPage {
  constructor(private page: Page) {}

  async assertValueExistsInPagination(
    expectedValue: string,
    columnIndex: number // 1-based index
  ) {
    while (true) {
      // Get all rows in current page
      const rows = this.page.locator('table tbody tr');
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        const cellText = await rows
          .nth(i)
          .locator(`td:nth-child(${columnIndex})`)
          .innerText();

        if (cellText.includes(expectedValue)) {
          console.log(`✅ Found "${expectedValue}"`);
          return;
        }
      }

      // Check if next page button is disabled
      const nextButton = this.page.locator('button[aria-label="Next page"]');

      if (await nextButton.isDisabled()) {
        break;
      }

      await nextButton.click();
      await this.page.waitForLoadState('networkidle');
    }

    throw new Error(`❌ "${expectedValue}" not found in any page`);
  }
}
