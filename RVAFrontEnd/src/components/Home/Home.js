import React, { useContext } from "react";
import ContentContext from "../../store/content-context";
import ProductionContent from "./ProductionContent";
import WorkerContent from "./WorkerContent";
import Card from "../UI/Card";
import classes from "./Home.module.css"

const Home = (props) => {
    const contentContext = useContext(ContentContext);
    
    let content = <ProductionContent />;

    if (contentContext.content === "worker") {
        content = <WorkerContent />;
    }

    return <div className={classes.home}>{content}</div>;
};

export default Home;