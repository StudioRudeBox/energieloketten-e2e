import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

// pages/HomePage.ts
export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);        
    }

    async open() {
        await this.page.goto('/');
        await this.waitForPageLoad();
    }
}