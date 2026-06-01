import { Locator, Page } from "@playwright/test";

// components/NavFooterMenu.ts
export class NavFooterMenu {
    constructor(private page: Page) { }

    private menuItem = (label: string) =>
        this.page.getByRole('navigation').getByText(label);

    async navigateTo(label: string) {
        await this.menuItem(label).click();
    }
}