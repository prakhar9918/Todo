import React, { useState } from "react";
import { useTodo } from "../../contexts";

import "../../App.css"

export default function Form() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()


    function isOutdoorTask(task) {
        const outdoorKeywords = ['walk', 'run', 'hike', 'bike', 'park'];
        return outdoorKeywords.some(keyword => task.toLowerCase().includes(keyword));
    }

    async function getLatLong() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        resolve([latitude, longitude]);
                    },
                    (error) => {
                        reject("Error getting location: " + error.message);
                    }
                );
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

    async function fetchLocation() {
        try {
            const [latitude, longitude] = await getLatLong();
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=083b46429bb448c2dbc491ded34039e0`)
            const data= await response.json()
            const temp = data.main.temp;
            const des =  data.weather[0].description;
            alert(`Temp : ${temp} and Description : ${des}`);
        } catch (err) {
            console.log(err);
        }
    }
    const add = (e) => {
        e.preventDefault();
        addTodo({ todo, completed: false });
        setTodo("");
        if (isOutdoorTask(todo)) {
            fetchLocation();
        }
    }



    return (


        <>
            <form onSubmit={add}>
                <input
                    type="text"
                    value={todo}
                    placeholder="Write here"
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit">ADD</button>
            </form>
        </>
    )
}