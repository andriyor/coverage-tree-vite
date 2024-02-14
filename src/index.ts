import fs from "fs";

import lodash from "lodash";

import { FileTreeNew } from "./types";

const tree = JSON.parse(fs.readFileSync("src/my-tree.json", "utf-8"));
console.dir(tree, { depth: null });

const traverseAndBundleTree = (node: FileTreeNew) => {
  if (node.children.length) {
    for (const child of node.children) {
      if (!child["totalMeta"]) {
        child["totalMeta"] = lodash.cloneDeep(child.meta);
      }
      traverseAndBundleTree(child);
      for (const type of ["lines", "functions", "statements", "branches"]) {
        for (const prop of ["total", "covered", "skipped"]) {
          node["totalMeta"][type][prop] =
            node["totalMeta"][type][prop] + child["totalMeta"][type][prop];
        }
      }

      for (const type of ["lines", "functions", "statements", "branches"]) {
        node["totalMeta"][type].pct = Number(
          (
            (node["totalMeta"][type].covered * 100) /
            node["totalMeta"][type].total
          ).toFixed(2)
        );
      }
    }
  }
};

tree["totalMeta"] = lodash.cloneDeep(tree.meta);
traverseAndBundleTree(tree);
console.log("new");

console.dir(tree, { depth: null });

fs.writeFileSync(
  "src/my-tree-sum.json",
  JSON.stringify(tree, null, 2),
  "utf-8"
);
