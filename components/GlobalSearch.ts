import { Locator, Page } from "@playwright/test";

// components/GlobalSearch.ts
export class GlobalSearch {
    
    private readonly page: Page;
    readonly searchContainer: Locator;
    readonly resultsContainer: Locator;
    readonly searchField: Locator;
    readonly searchButton: Locator;
    public searchFilterMunicipality!: Locator; // TODO: later change to readonly
    readonly resultsFilterNavigation: Locator;
    readonly resultItemsList: Locator;
    
    constructor(page: Page) {
        this.page = page;
        // TODO: add role=search to the search container and use it for heading and inputField constants, also add a name to the field
        // add role=searchbox and aria-multiline="true" to the textarea and add a label so it gets a name
        // this.searchContainer = page.getByRole('search', {name: ''});
        // this.searchField = this.searchContainer.getByRole('searchbox');
        this.searchContainer = page.locator('[class="mx-auto max-w-5xl px-3 pb-8 sm:px-6 sm:pb-20 lg:px-10"]');
        this.resultsContainer = this.searchContainer.getByLabel('Gevonden resultaten');
        this.searchField = this.searchContainer.locator('#search-chat-composer-input');
        this.searchButton = this.searchContainer.getByRole('button', { name: 'Zoeken' });
        this.resultsFilterNavigation = this.resultsContainer.getByRole('navigation', { name: "Filter op categorie" });
        // TODO: give the search results an Id and/or classes and aria-label="Zoekresultaten"
        // create an ordered list of the search results
        this.resultItemsList = page.locator('.divide-y.divide-neutral-200');
    }

    /**
     * Open the global search on the page.
     */
    async open() {
        await this.page.keyboard.press("Alt+Shift+Z");
    }

    /**
     * Search for items on the website.
     * @param prompt the search prompt
     */
    async search(prompt: string) {
        if(!await this.searchField.isVisible()) {
            await this.open()
        }

        await this.searchField.fill(prompt);
        await this.searchButton.click();
    }

    /**
     * Filter the search results on municipality (if this is in the search prompt).
     * @param municipality the municipality to search for
     */
    async filterOnMunicipality(municipality: string) {
        // TODO: give the municipality facet a aria-label that is more than the municipality name and something to select it with
        // Then move the locator to the contructor
        this.searchFilterMunicipality = this.searchContainer.getByRole('button', {
            name: municipality
        });

        if(await this.searchFilterMunicipality.isVisible()) {
            await this.searchFilterMunicipality.click();
        }
    }

    /**
     * Filter on the content type. Filtering is possible in the search box and in the results.
     * @param contentType the content type to filter on
     * @param options filter options
     */
    async filterOnContentType(contentType: 'Alles'|'Artikelen'|'Subsidies'|'Nieuws'|'Verhalen'|'Gemeenten', options: {filterType: 'search'|'results'}) {
        if(options.filterType === 'search') {
            await this.searchContainer.getByRole('button', {
                name: 'Filteren'
            }).click();

            // TODO: implement a locator for this container by giving it a name
            const filterButtonContainer = this.page.getByRole('dialog');
            await filterButtonContainer.getByRole('button', {
                name: contentType
            }).click();

        } else {
            await this.resultsFilterNavigation.getByRole('button', {
                name: contentType
            }).click();
        }        
    }

    /**
     * Get a single search results. When more search results are present you will get the first result.
     * @param title the title of the content to search for
     * @returns the found result
     */
    getResult(title: string): Locator {
        return this.resultItemsList.getByRole('heading', {
            level: 3,
            name: title
        }).first();
    }
   
    /**
     * Get all results of the search prompt.
     * @returns all results
     */
    getAllResults(): Locator {
        return this.resultItemsList.getByRole('heading', {
            level: 3
        })
    }

    /**
     * Get the number of results.
     * @returns the number of results
     */
    async getResultCount(): Promise<number> {
        return this.resultItemsList.getByRole('heading', {
            level: 3
        }).count();
    }

    /**
     * Open a link in the search results
     * @param title title of the content item to click on and navigate to
     */
    async openResult(title: string) {
        const result = this.getResult(title);
        await result.click();
    }
}