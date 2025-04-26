import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export const BrowserTerminal = () => {
    const {projectId: projectIdFromUrl} = useParams();
    const terminalRef = useRef(null);
    const socket = useRef(null);
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
        term.loadAddon(fitAddon);
        fitAddon.fit();
        // socket setup
        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
            query: {
                projectId: projectIdFromUrl
            }
        });

        // configure terminal socket event received
        socket.current.on("shell-output", (data) => {
            term.write(data);
        });

        // configure terminal socket event create
        term.onData((data) => {
            console.log(data);
            socket.current.emit("shell-input", data);
        });

        return () => {
            term.dispose();
            socket.current.disconnect();
        }
    },[])

    return (
        <div
            ref={terminalRef}
            style={{
                height: '25%vh',
                overflow: 'auto'
            }}
            className='terminal'
            id='terminal-container'
        >

        </div>
    );
}