import { Locator, Page } from "@playwright/test";

export class CookieModal {
    
    private readonly page: Page;
    private readonly container: Locator;
    private readonly dialogContainer: Locator;
    private readonly acceptAllBtn: Locator;
    private readonly denyAllBtn: Locator;
    private readonly customizeBtn: Locator;
    private readonly savePrefsBtn: Locator;
    private readonly switches: { functional: Locator; analytics: Locator; advertisement: Locator };

    constructor(page: Page) {
        this.page            = page;
        this.container       = page.getByRole('region', { name: 'We waarderen uw privacy' });
        this.dialogContainer = page.getByRole('dialog', { name: 'Toestemmingsvoorkeuren aanpassen' });
        this.acceptAllBtn    = this.container.getByRole('button', { name: 'Accepteer alles' });
        this.denyAllBtn      = this.container.getByRole('button', { name: 'Alles afwijzen' });
        this.customizeBtn    = this.container.getByRole('button', { name: 'Aanpassen' });
        this.savePrefsBtn    = this.dialogContainer.getByRole('button', { name: 'Bewaar mijn voorkeuren' });
        this.switches = {
            functional: this.dialogContainer.locator('#ckySwitchfunctional'),
            analytics: this.dialogContainer.locator('#ckySwitchanalytics'),
            advertisement: this.dialogContainer.locator('#ckySwitchadvertisement'),
        }
    }

    /** 
     * Returns true if the cookie consent modal is visible on the page.
     */
    async isVisible(): Promise<boolean> {
        return this.container.isVisible();
    }

    /** 
     * Clicks the "Accept all" button, consenting to all cookie categories.
     */
    async acceptAll(): Promise<void> {
        await this.acceptAllBtn.click();
    }

    /** 
     * Clicks the "Deny all" button, rejecting all optional cookie categories.
     */
    async denyAll(): Promise<void> {
        await this.denyAllBtn.click();
    }

    /**
     * Opens the customise panel and sets each cookie category toggle,
     * then saves the preferences.
     * @param prefs the cookie freferences for functional, analytical or advertisement cookies
     */
    async setPreferences(prefs: { functional: boolean; analytics: boolean; advertisement: boolean }): Promise<void> {
        await this.customizeBtn.click();
        await this.dialogContainer.waitFor({ state: 'visible' });

        await this.setSwitch('functional', prefs.functional);
        await this.setSwitch('analytics', prefs.analytics);
        await this.setSwitch('advertisement', prefs.advertisement);

        await this.savePrefsBtn.click();
    }

    /**
     * Helper class for setting preference switches
     * @param category the switch category
     * @param enable set preference
     */
    private async setSwitch(category: 'functional'|'analytics'|'advertisement', enable: boolean): Promise<void> {
        const toggle = this.switches[category];
        const isChecked = await toggle.isChecked();
        
        if (isChecked !== enable) {
            await toggle.click();
        }
    }
}
