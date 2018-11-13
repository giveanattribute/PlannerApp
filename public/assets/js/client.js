export class Client {

    constructor() {

    }


    getWeather() {

        $.get("/weather", function(data, status) {

            console.log(data);
        })



    }
}