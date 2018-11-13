class Weather {

    constructor() {}

    getData() {
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

}