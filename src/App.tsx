import {
  // ViewerComponent,
  Viewer,
  WebIFCLoaderPlugin,
} from "@behagoras/felipelib";
import { useState } from "react";
import ViewerComponent from "./ViewerComponent";

function App() {
  return (
    <div className="App">
      <ViewerComponent
        config={{ canvasId: "myCanvas", transparent: true }}
        // onViewerLoaded={(viewer: Viewer) => {
        //   viewer.camera.eye = [-3.933, 2.855, 27.018];
        //   viewer.camera.look = [4.4, 3.724, 8.899];
        //   viewer.camera.up = [-0.018, 0.999, 0.039];
        //   const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
        //     // Path to web-ifc.wasm, which does the IFC parsing for us
        //     wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/",
        //   });
        //   webIFCLoader.load({
        //     src: "https://3dves-shared-files.s3.us-west-2.amazonaws.com/products/bimep/Duplex_A_20110505_IssuesAlternate.ifc",
        //     edges: true,
        //   });
        // }}
      />
    </div>
  );
}

export default App;
