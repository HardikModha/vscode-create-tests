import * as path from "path";
import { Uri, workspace, WorkspaceFolder } from "vscode";
import { getDirectoryPath } from "./utils";

export class SourceFile {
  private sourceFileUri: Uri;
  private workSpaceFolder: WorkspaceFolder | undefined;

  constructor(sourceFileUri: Uri) {
    this.sourceFileUri = sourceFileUri;
    this.workSpaceFolder = workspace.getWorkspaceFolder(sourceFileUri);
  }

  getBaseDirectoryPath(): string {
    return this.workSpaceFolder ? this.workSpaceFolder.uri.fsPath : "";
  }

  getAbsolutePath(): string {
    return this.sourceFileUri.fsPath;
  }

  getRelativeFileDirname(): string {
    return path.relative(this.getBaseDirectoryPath(), this.getAbsolutePath());
  }

  getDirectoryPath(): string {
    return getDirectoryPath(this.getAbsolutePath());
  }

  getName(): string {
    return path.basename(this.sourceFileUri.fsPath);
  }

  getExtension(): string {
    return this.sourceFileUri.fsPath.split(".").pop() || "";
  }

  getNameWithoutExtension(): string {
    return path.basename(
      this.sourceFileUri.fsPath,
      path.extname(this.sourceFileUri.fsPath)
    );
  }
}
