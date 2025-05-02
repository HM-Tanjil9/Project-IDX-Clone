import { AttachAddon } from '@xterm/addon-attach';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react';
import { useTerminalSocketStore } from '../../../store/terminalSocketStore';

export const BrowserTerminal = () => {
    const { terminalSocket } = useTerminalSocketStore();
    
    const terminalRef = useRef(null);
    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#282a37',
                foreground: '#f8f8f3',
                cursor: '#f8f8f3',
                cursorAccent: '#282a37',
                red: '#ff5544',
                green: '#50fa7c',
                yellow: '#f1fa8c',
                cyan: '#8be9fd'
            },
            fontSize: 16,
            fontFamily: 'Fira Code',
            convertEol: true,
        });

        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon); // Align xterm properly in parent div
        fitAddon.fit(); 
       
        if(terminalSocket) {
            terminalSocket.onopen = () => {
                const attachAddon = new AttachAddon(terminalSocket); // connect xterm to a terminal(Docker container terminal)
                term.loadAddon(attachAddon); 
                terminalSocket.current = terminalSocket;
            };
        }

        return () => {
            term.dispose();
        }
    },[terminalSocket])

    return (
        <div
            ref={terminalRef}
            style={{
                width: '100vw',
            }}
            className='terminal'
            id='terminal-container'
        >

        </div>
    );
}