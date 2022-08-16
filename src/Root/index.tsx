import React, { useEffect, useState } from "react";
import App from "./App";
import { loadTokenPrices } from "../helpers";
import Loading from "../components/Loader";

function Root() {
    const isApp = (): boolean => {
        return window.location.host.includes("app");
    };

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     loadTokenPrices().then(() => setLoading(false));
    // }, []);

    if (loading) return <Loading />;

    const app = () => (
        <App />
    );

    return app();
}

export default Root;
