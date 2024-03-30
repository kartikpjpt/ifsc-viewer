// @ts-ignore
import {
  Viewer,
  WebIFCLoaderPlugin,
  //   @ts-ignore
} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";
//   @ts-ignore
import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/web-ifc-api.js";
import React, { useEffect, useLayoutEffect } from "react";

export interface ViewerProps {
  config: any;
  onViewerLoaded?: (viewer: Viewer) => void;
}

export default function ViewerComponent({
  config,
  onViewerLoaded,
}: ViewerProps) {
  const { canvasId, transparent } = config;
  useLayoutEffect(() => {
    const initViewer = async () => {
      await new Promise((resolve) => setTimeout(() => resolve(1), 100));
      const viewer = new Viewer({
        canvasId,
        transparent,
      });
      if (onViewerLoaded && viewer) {
        onViewerLoaded(viewer);
      } else {
        viewer.camera.eye = [-3.933, 2.855, 27.018];
        viewer.camera.look = [4.4, 3.724, 8.899];
        viewer.camera.up = [-0.018, 0.999, 0.039];
        console.log("viewer", viewer);
        try {
          const IfcAPI = new WebIFC.IfcAPI();
          IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/");
          //   let modelID = IfcAPI.OpenModel([1]);
          await IfcAPI.Init();
          const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
            // Path to web-ifc.wasm, which does the IFC parsing for us
            // wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/web-ifc.wasm",
            WebIFC,
            IfcAPI,
          });
          console.log(1);
          const sceneModel = webIFCLoader.load({
            src: "https://www.steptools.com/docs/stpfiles/ifc/AC20-FZK-Haus.ifc",
            edges: true,
          });
          console.log(2);

          sceneModel.on("loaded", () => {
            console.log("scene loaded");
            viewer.cameraFlight.jumpTo(sceneModel);
          });
          console.log(3);

          return () => viewer.destroy();
        } catch (err) {
          console.error(err);
        }
        console.log({ viewer });
      }
    };
    initViewer();
  }, []);

  return (
    <canvas
      id="myCanvas"
      style={{ border: "1px solid red", width: "600px", height: "700px" }}
    />
  );
}
