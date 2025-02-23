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
    const webviewUri = this.getUri(webview, this._extensionUri, ["dist", "webview.js"]);
    const stylesUri = this.getUri(webview, this._extensionUri, ["dist", "styles.css"]);
    const nonce = this.getNonce();

    return `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
					<link rel="stylesheet" href="${stylesUri}">
					<title>JA</title>
				</head>
				<body>
          <h1>HELLO</h1>
          <h1 id="showtitle" />
          <button onclick="getTitle()">点击显示</button>
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