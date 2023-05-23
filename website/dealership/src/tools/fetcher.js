import {API_URL, PUBLIC_TOKEN} from "../globals";
import {readLocalStorage} from "./readLocalStorage";

export function sendCar(car, method) {
    const user_id = readLocalStorage("user_id");
    fetch(API_URL + "/car" + (method === 'PUT' ? '/' + car.id : ''), {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'token': PUBLIC_TOKEN
        },
        body: JSON.stringify({
            make: car.make,
            model: car.model,
            color: car.color,
            description: car.description,
            image: car.image,
            mileage: car.mileage,
            price: car.price,
            vin: car.vin,
            year: car.year,
            creator_id: user_id,
            sold: car.sold,
            invoker_id: readLocalStorage("user_id")
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        // redirect the user to the home page
        window.location.href = "/";
        console.log(data);
    });
}

export function createCustomer(email, name) {
    console.log(email, name)
    fetch(API_URL + "/customer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': PUBLIC_TOKEN
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        localStorage.setItem("user_id", data.id);
        window.location.reload();
    })
}

export function getCars(callback) {
    fetch(API_URL + '/car', {
        headers: {
            token: PUBLIC_TOKEN
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        callback(data);
    });
}

export function getCar(id, callback) {
    fetch(API_URL + '/car/' + id, {
        headers: {
            token: PUBLIC_TOKEN
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        callback(data);
    });
}

export function postDeveloper(name, email, callback) {
    fetch(API_URL + "/developer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': PUBLIC_TOKEN
        },
        body: JSON.stringify({
            name: name,
            email: email,
            priorityGroup: 2
        })
    }).then(res => res.json())
        .then(data => {
            if (data.token !== undefined) {
                callback(data.token);
            }
        });
}