import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { GlobalSearch } from '../components/GlobalSearch';

/**
 * Set search variables
 */
const municipalityName = 'Stein';
const searchPrompt = 'Ik woon in Stein, ik ben eigenaar van een woning en ik wil weten hoe mijn woning er aan toe is';
const articleTitle = 'Doe de Quickscan en zie hoe jouw woning presteert!';

/**
 * Open the semantic search on the homepage and do a search based on the search variables
 */
test('Use the global search', async({page}) => {

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.cookieModal.denyAll();

    const globalSearch = new GlobalSearch(page);
    await globalSearch.open();
    
    await expect(globalSearch.searchContainer.getByRole('heading', {
        level: 1,
        name: "Waar kunnen we je mee helpen?"
    })).toBeVisible();

    await globalSearch.filterOnContentType("Artikelen", {
        filterType: "search"
    });
    
    await globalSearch.search(searchPrompt);
    await globalSearch.filterOnMunicipality(municipalityName);

    await expect(globalSearch.searchFilterMunicipality).toBeVisible();
    await expect(globalSearch.searchFilterMunicipality).toHaveText(municipalityName);
    
    // filter results on articles
    // await globalSearch.filterOnContentType("Artikelen", {
    //     filterType: "results"
    // });

    const matchingResult = globalSearch.getResult(articleTitle);
    await expect(matchingResult).toBeVisible();

    console.log(`There are ${await globalSearch.getResultCount()} items found by this search prompt.`)

    await globalSearch.openResult(articleTitle);
})