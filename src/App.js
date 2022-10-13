import { useState } from "react";
import { AppContext } from "./context/store";
import AppRouting from "./AppRouting";

import "./styles/App.css";

const App = () => {
  const initialState = {
    layers: [],
    selectedLayer: "",
    selectedImages: [],
  };

  initialState.auth = localStorage.getItem("auth");

  initialState.auth = JSON.parse(initialState.auth);

  const [appState, setAppState] = useState(initialState);

  const applyAction = (action, payload) => {
    switch (action) {
      case "set-auth":
        setAppState((pre) => ({
          ...pre,
          auth: payload,
        }));
        break;
      case "add-layer":
        setAppState((pre) => ({
          ...pre,
          layers: payload,
        }));
        break;
      case "select-action":
        const images = appState.layers.filter((ele) => {
          if (ele.name === appState.selectedLayer) {
            return ele.images;
          }
        });

        setAppState((pre) => ({
          ...pre,
          selectedLayer: payload,
          selectedImages: images,
        }));
        break;
      case "discard-generate-nft":
        setAppState((pre) => ({
          ...pre,
          selectedLayer: "",
          layers: [],
          selectedImages: [],
        }));
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider value={{ appState, applyAction }}>
      <AppRouting />
    </AppContext.Provider>
  );
};

export default App;
