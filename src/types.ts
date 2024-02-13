type CoverageInfo = {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
};

type Coverage = {
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
