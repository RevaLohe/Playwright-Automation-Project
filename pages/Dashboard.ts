import { expect, Locator, Page } from "@playwright/test";        

export class Dashboard{

    private readonly dashboardHeadingText : Locator;
    private readonly page: Page;

    constructor(page:Page){
        this.page = page;
        this.dashboardHeadingText = page.getByText('Swag Labs'); 
    }

    async assertLoaded(){
        await expect(this.dashboardHeadingText).toBeVisible();
        await expect(this.page).toHaveURL(/inventory/)
    }


}