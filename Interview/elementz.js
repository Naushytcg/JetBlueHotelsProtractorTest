module.exports =
    {
        searchInput: {
            location: {text: 'e.g., Las Vegas', el: element(by.css('#qf-0q-destination'))},
            checkIn: {text: 'mm/dd/yy', el: element(by.css('#qf-0q-localised-check-in'))},
            checkOut: {text: 'mm/dd/yy', el: element(by.css('#qf-0q-localised-check-out'))},
            roomsDrop: {text: '1 room, 1 adult', el: element(by.css('#qf-0q-compact-occupancy'))},
            searchButton: {text: 'Search', el: element(by.css('.widget-query-ft button'))},
            locError:{text: 'Please tell us the destination, hotel or landmark you’re looking for',
                        el: element(by.css('.form-error-cont > div > span'))},
            chkInError: {text: 'Please tell us your check in date', el: element(by.css('div[class="form-error"]'))},
            chkOutError: {text: 'Please tell us your check out date', el: element(by.css('div[class="form-error"]'))},
            earlyChkInError: {text: 'Your check in date is before today', el: element(by.css('div[class="form-error"]'))},
            earlyChkOutError: {text: 'Please tell us your check out date', el: element(by.css('div[class="form-error"]'))},
            nightCount: {text: '', el: element(by.css('.widget-query-num-nights'))},
            dateClose: {text:'close', el: element(by.css('button[class="widget-overlay-close"]'))}
        },

        searchResults: {
            dest: {text: 'Salt Lake City, Utah, United States of America', el: element(by.css('.summary h1'))},
            dates: {text: 'Sat 17 - Tue 20 August 2019', el: element(by.css('.search-dates'))},
            nights: {text: '3 nights', el: element(by.css('.search-nights'))},
            adultRoom: {text: '1 room, 1 adult', el: element(by.css('.search-rooms'))},
            freeBreakBox: {text: 'Free Breakfast', el: by.css('label[id="f-label-popular-2048"]'))},
            freeBreakFilter: {text: 'Free Breakfast', el: element(by.id('f-facilities-2048-cont'))},
        }

    };
