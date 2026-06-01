import { Locator, Page } from "@playwright/test";
import { CookieModal } from "../components/CookieModal";
import { NavMainMenu } from "../components/NavMainMenu";
import { NavFooterMenu } from "../components/NavFooterMenu";

export class BasePage {
    
    protected readonly page: Page;
    readonly cookieModal: CookieModal;
    readonly mainMenu: NavMainMenu;
    readonly footerMenu: NavFooterMenu;
    readonly mainHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookieModal = new CookieModal(page);
        this.mainMenu = new NavMainMenu(page);
        this.footerMenu = new NavFooterMenu(page);
        this.mainHeading = this.page.getByRole('heading', { level: 1 }).first();
    }

    /**
     * Wait till the DOM is loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Get the page title from the <title> tag
     * @returns - the page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}
