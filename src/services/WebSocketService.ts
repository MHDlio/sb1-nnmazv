import { WebSocket } from 'ws'

class WebSocketService {
  private wss: WebSocket.Server

  constructor() {
    this.wss = new WebSocket.Server({ port: 8080 })
    this.setupHandlers()
  }

  private setupHandlers() {
    this.wss.on('connection', (ws) => {
      ws.on('message', this.handleMessage)
    })
  }

  public broadcast(event: string, data: any) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event, data }))
      }
    })
  }
} 