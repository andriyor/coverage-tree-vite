import Graphin, { Behaviors, Utils } from "@antv/graphin";

// import tree from "./tree.json";
// import myTree from "./my-tree.json";
import myTreeSum from "./my-tree-sum.json";
import { FileTreeNew } from "./types";

const { DragCanvas, ZoomCanvas, DragNode, TreeCollapse } = Behaviors;

// const dataTree = Utils.mock(20).tree().graphinTree();
// console.log(dataTree);

const getColorByCoverage = (percentage: number) => {
  if (percentage >= 70 && percentage <= 100) {
    return "green";
  } else if (percentage >= 50 && percentage <= 70) {
    return "yellow";
  } else {
    return "red";
  }
};

const buildNodeText = (cfg: FileTreeNew) => {
  return (
    `${cfg.name}\n` +
    "Lines in file: " +
    cfg.meta.lines.pct +
    ` ${cfg.meta.lines.covered}/${cfg.meta.lines.total}\n` +
    "Lines in tree: " +
    cfg.totalMeta.lines.pct +
    ` ${cfg.totalMeta.lines.covered}/${cfg.totalMeta.lines.total}`
  );
};

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    draw(cfg: FileTreeNew, group) {
      const keyshape = group.addShape("rect", {
        attrs: {
          id: "circle-floor",
          x: 0,
          y: 0,
          width: 200,
          height: 45,
          fill: getColorByCoverage(cfg.meta.lines.pct),
        },
        draggable: true,
        name: "circle-floor",
      });
      group.addShape("text", {
        attrs: {
          fontSize: 12,
          x: 0,
          y: 40,
          text: buildNodeText(cfg),
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
        data={myTreeSum}
        defaultNode={{ type: "custom-node" }}
        layout={{
          type: "compactBox",
          direction: "LR",
          getId: function getId(d: FileTreeNew) {
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
