class Planner {
    constructor() {}
    getWeather() {
        $.ajax({
            url: '/weather',
            method: 'GET',
            success: function(data) {
                return data
            },

            error: function(err) {
                console.log('Failed');
            }
        });
    }


    getLezioni() {}
    getNews() {}
    setLezioni() {}
    setNews() {}
}