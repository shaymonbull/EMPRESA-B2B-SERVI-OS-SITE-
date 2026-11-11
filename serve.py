"""Servidor estático em Python:  python serve.py [porta]"""
import http.server, socketserver, os, sys, webbrowser
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "public"))
class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".js": "text/javascript", ".svg": "image/svg+xml"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache"); super().end_headers()
socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(("", PORT), H) as s:
    url = f"http://localhost:{PORT}"
    print(f"\n  B2B Serviços rodando em {url}\n  (Ctrl+C para parar)\n")
    webbrowser.open(url)
    try: s.serve_forever()
    except KeyboardInterrupt: print("\nEncerrado.")
