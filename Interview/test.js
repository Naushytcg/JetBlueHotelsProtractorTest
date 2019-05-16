const mainPage = require('./elementz');
const searchPrice = 'https://hotels.jetblue.com/search.do?resolved-location=CITY%3A1430026%3AUNKNOWN%3AUNKNOWN&f-price-currency-code=USD&f-price-multiplier=1&f-price-max=100&destination-id=1430026&q-destination=Salt%20Lake%20City,%20Utah,%20United%20States%20of%20America&q-check-in=2019-05-17&q-check-out=2019-05-20&q-rooms=1&q-room-0-adults=1&q-room-0-children=0'
const eC = protractor.ExpectedConditions;


// TODO Test the default value of the search input section. DONE
// TODO Checking the need for required field location DONE
// TODO Checking the need for required field Check in DONE
// TODO Checking the need for required field Check out DONE
// TODO Check to see if date range correctly returns correct number of nights DONE
// TODO Check location and date of stay is returned is correct on result page DONE
// TODO Check that the results page shows the correct room selection is correct DONE
// TODO Check that the results page shows the correct number of nights DONE
// TODO Test the Nightly Price slider to return the correct prices DONE
// TODO Test search filter with one left tab selector DONE

// TODO Test search filter with multiple left tab selectors
// TODO Test top sort by function result with a drop down


describe('Searching for Hotels on JetBlue',function() {

    it('go to the Hotel book section of JetBlue.com', () => {
        browser.waitForAngularEnabled(false);
        browser.get('https://hotels.jetblue.com/')
    });

    it('should match the default value of destination input box', () => {
        expect(mainPage.searchInput.location.text).toContain('e.g., Las Vegas')
    });

    it('should match the format of the check in', () => {
        expect(mainPage.searchInput.checkIn.text).toContain('mm/dd/yy')
    });

    it('should match the format of the check out', () => {
        expect(mainPage.searchInput.checkOut.text).toContain('mm/dd/yy')
    });

    it('check default value of the Rooms section',() => {
        expect(mainPage.searchInput.roomsDrop.text).toContain('1 room, 1 adult')
    });

    it('put in values for check in',() => {
        mainPage.searchInput.checkIn.el.clear();
        mainPage.searchInput.checkIn.el.sendKeys('08/17/19');
    });

    it('put in values for check out',() => {
        mainPage.searchInput.checkOut.el.clear();
        mainPage.searchInput.checkOut.el.sendKeys('08/20/19');
    });

    it('select the 1 room, 1 adult room option in the dropdown', () => {
        mainPage.searchInput.roomsDrop.el.click();
        element(by.cssContainingText('option', '1 room, 1 adult')).click();
    });

    it('check for the correct number of nights',() => {
        expect(mainPage.searchInput.nightCount.el.getText()).toContain('3')
    });

    it('search should fail with no location error', () => {
        mainPage.searchInput.searchButton.el.click();
        expect(mainPage.searchInput.locError.text).toContain('Please tell us the destination, hotel or landmark you’re looking for');
    });

    it('clear the values for check in',() => {
        mainPage.searchInput.checkIn.el.clear();
    });

    it('input destination into location input and search', () => {
        mainPage.searchInput.location.el.sendKeys('Salt Lake City, Utah');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });

    it('no check in date should cause error message', () => {
        expect(mainPage.searchInput.chkInError.text).toContain('Please tell us your check in date');
    });

    it('put in values for check in back',() => {
        mainPage.searchInput.checkIn.el.clear();
        mainPage.searchInput.checkIn.el.sendKeys('08/17/19');
    });

    it('clear the values for check out',() => {
        mainPage.searchInput.checkOut.el.clear();
    });
    
    it('conduct search with no checkout date should cause error', () => {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect(mainPage.searchInput.chkOutError.text).toContain('Please tell us your check out date');
    });

    it('put in values for check out',() => {
        mainPage.searchInput.checkOut.el.clear();
        mainPage.searchInput.checkOut.el.sendKeys('08/20/19');
    });

    it('put in a check in date that has already past', () => {
        mainPage.searchInput.checkIn.el.clear();
        mainPage.searchInput.checkIn.el.sendKeys('01/17/19');
    });

    it('conduct search with a past check in date should cause error', () => {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect(mainPage.searchInput.earlyChkInError.text).toContain('Your check in date is before today');
    });

    it('put in correct check in date', () => {
        mainPage.searchInput.checkIn.el.clear();
        mainPage.searchInput.checkIn.el.sendKeys('08/17/19');
    });

    it('put in values for check out',() => {
        mainPage.searchInput.checkOut.el.clear();
        mainPage.searchInput.checkOut.el.sendKeys('08/20/19');
    });
    it('perform search of 08/17/19 - 08/20/19 1Adult 1Room Salt Lake City Utah', () => {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });

    it('confirm that salt lake city is the correct search result at top of page', () => {
        expect(mainPage.searchResults.dest.text).toContain('Salt Lake City, Utah, United States of America');
    });

    it('confirm the correct date range is at the top of the page', () => {
        expect(mainPage.searchResults.dates.text).toContain('Sat 17 - Tue 20 August 2019');
    });

    it('confirm that the correct amount of nights are at the top of page', () => {
        // mainPage.searchResults.nights.el.getText().then( function(i){
        //     console.log(i)
        // });
        expect(mainPage.searchResults.nights.text).toContain('3 nights')
    });

    it('confirm the correct number of rooms and adults', () => {
        // mainPage.searchResults.adultRoom.el.getText().then( function(i){
        //     console.log(i)
        // });
        expect(mainPage.searchResults.adultRoom.text).toContain('1 room, 1 adult')
    });

    it('click on the free breakfast popular filter check box', () => {
        mainPage.searchResults.freeBreakBox.el.click();
    });

    it('check for free breakfast filter applied to page', () => {
        //waits for the filter to appear on the page as a de-selector
        browser.wait(eC.visibilityOf(mainPage.searchResults.freeBreakFilter.el), 8000);
        expect(mainPage.searchResults.freeBreakFilter.text).toContain('Free Breakfast');
    });

    it('force page with night price set at 100$ max', () => {
        //forces slider to a max night stay of 100$
        browser.get(searchPrice);
    });

    it('check the max price of 100 to be true in search results', () => {
        const maxPrice = 100;

        //checks all the Red discount prices
        element.all(by.css('.price-link ins')).getText().then( function(prices){
            prices.forEach( function(price){
                price = price.replace('$', '');
                expect(price < maxPrice).toBe(true);
            })
        });

        //checks all the black final prices
        element.all(by.css('.price-link strong')).getText().then( function(prices){
            prices.forEach( function(price){
                price = price.replace('$', '');
                expect(price < maxPrice).toBe(true);
            })
        })
    });

    it('', () => {
        browser.sleep(5000)
    });


});