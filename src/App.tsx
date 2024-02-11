import Graphin, { Behaviors, Utils } from "@antv/graphin";

import data from "./data.json";
import tree from "./tree.json";

const { DragCanvas, ZoomCanvas, DragNode, TreeCollapse } = Behaviors;

const dataTree = Utils.mock(20).tree().graphinTree();
console.log(dataTree);

Graphin.registerNode(
  "custom-node",

  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    draw(cfg, group) {
      const keyshape = group.addShape("rect", {
        attrs: {
          id: "circle-floor",
          x: 0,
          y: 0,
          width: 200,
          height: 20,
          fill: "red",
        },
        draggable: true,
        name: "circle-floor",
      });
      group.addShape("text", {
        attrs: {
          fontSize: 12,
          x: 0,
          y: 15,
          text: cfg.name,
          fill: "#ddd",
        },
        draggable: true,
        name: "text",
      });
      return keyshape;
    },
  },
  "single-node"
);

function App() {
  return (
    <div style={{ height: "95vh" }}>
      <Graphin
        data={tree}
        defaultNode={{ type: "custom-node" }}
        layout={{
          type: "compactBox",
          direction: "LR",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 16;
          },
          getWidth: function getWidth() {
            return 20;
          },
          getVGap: function getVGap() {
            return 40;
          },
          getHGap: function getHGap() {
            return 120;
          },
        }}
      >
        <TreeCollapse trigger="click " />
        <ZoomCanvas enableOptimize />
        <DragNode />
        <DragCanvas />
      </Graphin>
    </div>
  );
}

export default App;
