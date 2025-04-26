import { createConnection } from "node:net";

class MyProtocol {
    constructor() {
        this.client = createConnection({
            host: 'localhost',
            port: 9001,
        });
        this.ready = false;

        console.log('Connection Established...');

        this.client.on('end', () => {
            console.log('Retry connection 3-4 times');
        });
    }

    send(data) {
        const payload = `[SOF]\n${data}\n[EOF]`;
        this.client.write(Buffer.from(payload));
    }
}

const c = new MyProtocol();
c.send("Hello World")