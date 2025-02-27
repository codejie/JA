import * as vscode from "vscode"

export class SideProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'ja.sideView';
  
  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'dist')]
    }
    webviewView.webview.html = this.getWebviewContent(webviewView.webview);    
  }

  private getWebviewContent(webview: vscode.Webview): string {
    const webviewUri = this.getUri(webview, this._extensionUri, ["dist", "webview", "webview.js"]);
    const stylesUri = this.getUri(webview, this._extensionUri, ["dist", "webview", "webview.css"]);
    const nonce = this.getNonce();

    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>JA</title>
        </head>
        <body>
          <div id="app"></div>
          <script type="module" src="https://unpkg.com/@vscode/webview-ui-toolkit/dist/toolkit.min.js"></script>
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>    
    `;
  }

  private getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
  }

  private getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }  
}