import React, { useState } from "react";

const ContentContext = React.createContext({
    content: null,
    onWorker: () => {},
    onProduction: () => {}
});

export const ContentContextProvider = (props) => {
    const [content, setContent] = useState("production");

    const onWorkerHandler = () => {
        setContent("worker");
    };

    const onProductionHandler = () => {
        setContent("production");
    };

    return (
      <ContentContext.Provider value={{
        content: content,
        onWorker: onWorkerHandler,
        onProduction: onProductionHandler
      }}>
        {props.children}
      </ContentContext.Provider>
    );
};

export default ContentContext;