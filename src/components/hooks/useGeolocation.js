import React, { useEffect, useState } from "react";

export default function useGeolocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", long: "" },
    });
    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                long: location.coords.longitude,
            },
        });
    };
    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        });
    };
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                error: "Geolocation not supported",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
    return location;
}
