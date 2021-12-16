import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const packets = lines[0];

const hexaMap = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

let bitRepresentation = packets
  .split('')
  .map(x => hexaMap[x as '1'])
  .join('');

let versionSum = 0;

let operands = [] as number[];

const readNextPacket = (packet: string) => {
  if (packet === undefined || packet.length === 0) {
    return '';
  }
  const version = parseInt(packet.slice(0, 3), 2);

  if (isNaN(version)) {
    console.log('oups');
    process.exit();
  }
  versionSum += version;

  packet = packet.substring(3);

  const typeId = parseInt(packet.slice(0, 3), 2);
  packet = packet.substring(3);

  if (typeId === 4) {
    let t = '';
    while (true) {
      t += packet.slice(1, 5);
      const prefix = packet[0];
      packet = packet.substring(5);
      if (prefix === '0') {
        break;
      }
    }
    operands.push(parseInt(t, 2));
  } else {
    const operations = [
      (a: number, b: number) => a + b,
      (a: number, b: number) => a * b,
      (a: number, b: number) => Math.min(a, b),
      (a: number, b: number) => Math.max(a, b),
      (a: number, b: number) => (a > b ? 1 : 0),
      (a: number, b: number) => (a < b ? 1 : 0),
      (a: number, b: number) => (a === b ? 1 : 0),
    ];

    let oldOperands = operands;
    operands = [];

    const currentOperation = operations[typeId - (typeId > 4 ? 1 : 0)];

    const lengthTypeId = packet[0];
    packet = packet.substring(1);
    if (lengthTypeId === '0') {
      const L = packet.slice(0, 15);
      packet = packet.substring(15);
      const subPacketLength = parseInt(L, 2);

      let subPackets = packet.slice(0, subPacketLength);

      while (subPackets.length > 0) {
        subPackets = readNextPacket(subPackets);
      }
      packet = packet.substring(subPacketLength);
    } else {
      const length = packet.slice(0, 11);
      packet = packet.substring(11);
      const subPacketCount = parseInt(length, 2);

      for (let i = 0; i < subPacketCount; i += 1) {
        packet = readNextPacket(packet);
      }
    }

    operands = [
      ...oldOperands,
      operands.reduce((previous, current) => currentOperation(previous, current)),
    ];
  }

  return packet;
};

readNextPacket(bitRepresentation);
console.log(operands[0]);
