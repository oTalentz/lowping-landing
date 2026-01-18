"use client"

/**
 * Classe que gerencia uma conexão WebSocket persistente para medição de ping.
 */
export class PingMonitor {
    private socket: WebSocket | null = null
    private url: string
    private sendTimes: number[] = []
    private pingMeasurements: number[] = []
    private pingCount = 0
    private responseCount = 0
    private connectionTimeout: NodeJS.Timeout | null = null
    private onPingResult: (ping: number | null) => void
    private isConnecting = false
    
    constructor(ipAddress: string, onPingResult: (ping: number | null) => void) {
        this.url = `wss://${ipAddress}`
        this.onPingResult = onPingResult
    }
    
    /**
     * Conecta ao servidor WebSocket se ainda não estiver conectado.
     */
    connect(): void {
        if (this.socket || this.isConnecting) return
        
        this.isConnecting = true
        
        try {
            this.socket = new WebSocket(this.url)
            
            this.socket.onopen = () => {
                this.isConnecting = false
                if (this.connectionTimeout) {
                    clearTimeout(this.connectionTimeout)
                }
                
                // Enviar ping inicial ao conectar
                this.sendPing()
            }
            
            this.socket.onmessage = () => {
                const receiveTime = performance.now()
                const pingTime = receiveTime - this.sendTimes[this.responseCount++]
                this.pingMeasurements.push(pingTime)
                
                // Calcular média após acumular algumas medições
                if (this.pingMeasurements.length >= 3) {
                    const avgPing = Math.round(
                        this.pingMeasurements.reduce((sum, ping) => sum + ping, 0) / 
                        this.pingMeasurements.length
                    )
                    
                    // Manter apenas as últimas 5 medições
                    if (this.pingMeasurements.length > 5) {
                        this.pingMeasurements.shift()
                    }
                    
                    this.onPingResult(avgPing)
                }
            }
            
            this.socket.onclose = this.socket.onerror = () => {
                if (this.connectionTimeout) {
                    clearTimeout(this.connectionTimeout)
                }
                this.socket = null
                this.isConnecting = false
                this.onPingResult(null)
            }
            
            // Tempo limite de conexão de 10 segundos
            this.connectionTimeout = setTimeout(() => {
                if (this.socket) {
                    this.socket.close()
                    this.socket = null
                }
                this.isConnecting = false
                this.onPingResult(null)
            }, 10000)
            
        } catch (error) {
            console.error(`Error connecting to ${this.url}:`, error)
            this.socket = null
            this.isConnecting = false
            this.onPingResult(null)
        }
    }
    
    /**
     * Envia uma solicitação de ping pelo WebSocket
     */
    sendPing(): boolean {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            if (!this.isConnecting) {
                this.connect()
            }
            return false
        }
        
        this.socket.send("ping")
        this.sendTimes[this.pingCount++] = performance.now()
        return true
    }
    
    /**
     * Fecha a conexão WebSocket
     */
    disconnect(): void {
        if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout)
            this.connectionTimeout = null
        }
        
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
        
        this.isConnecting = false
    }
}

// Armazena instâncias ativas de monitores de ping
const pingMonitors = new Map<string, PingMonitor>()

/**
 * Configura um monitor de ping persistente.
 * @param ipAddress O endereço IP do servidor.
 * @param onPingResult Callback para resultados de ping.
 * @returns Função para limpar o monitor.
 */
export function setupPingMonitor(
    ipAddress: string | null,
    onPingResult: (ping: number | null) => void
): () => void {
    if (!ipAddress) {
        onPingResult(null)
        return () => {}
    }
    
    // Reutilizar monitor existente ou criar um novo
    if (!pingMonitors.has(ipAddress)) {
        const monitor = new PingMonitor(ipAddress, onPingResult)
        pingMonitors.set(ipAddress, monitor)
        monitor.connect()
    } else {
        const existingMonitor = pingMonitors.get(ipAddress)!
        // Atualizar callback
        pingMonitors.set(ipAddress, new PingMonitor(ipAddress, onPingResult))
        existingMonitor.disconnect()
    }
    
    // Retorna função de limpeza
    return () => {
        const monitor = pingMonitors.get(ipAddress)
        if (monitor) {
            monitor.disconnect()
            pingMonitors.delete(ipAddress)
        }
    }
}

/**
 * Envia uma solicitação de ping em um monitor existente.
 * @param ipAddress Endereço IP para o qual enviar ping.
 * @returns true se o ping foi enviado, false caso contrário.
 */
export function sendPingRequest(ipAddress: string | null): boolean {
    if (!ipAddress) return false
    
    const monitor = pingMonitors.get(ipAddress)
    if (monitor) {
        return monitor.sendPing()
    }
    
    return false
}

/**
 * Função legada para manter compatibilidade. 
 * Usa o novo sistema de monitoramento persistente.
 */
export async function measurePing(ipAddress: string | null): Promise<number | null> {
    if (!ipAddress) return null
    
    return new Promise((resolve) => {
        const _cleanup = setupPingMonitor(ipAddress, (result) => {
            resolve(result)
            // Não desconecta imediatamente para permitir reutilização
        })
        
        // Timeout para garantir que a promessa seja resolvida
        setTimeout(() => {
            resolve(null)
            // cleanup() // Não limpar para permitir reutilização
        }, 10000)
    })
}