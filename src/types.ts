type CoverageInfo = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

export type Coverage = {
  lines: CoverageInfo;
  functions: CoverageInfo;
  statements: CoverageInfo;
  branches: CoverageInfo;
};

export type FileTree = {
  id: string;
  parentId?: string;
  path: string;
  name: string;
  meta: Coverage;
  children: FileTree[];
};

export type FileTreeNew = FileTree & {
  totalMeta: Coverage;
  children: FileTreeNew[];
};
