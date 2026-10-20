export function ipToLong(ip) {
  return ip
    .split('.')
    .map((o) => parseInt(o, 10))
    .reduce((acc, o) => acc * 256 + o, 0);
}

export function longToIp(n) {
  return [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.');
}

export function toBinary(n) {
  return (n >>> 0).toString(2).padStart(32, '0');
}

export function subnetInfo(ip, prefix) {
  const value = ipToLong(ip);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (value & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  const usable = prefix >= 31 ? 0 : Math.max(0, total - 2);

  let firstHost = network;
  let lastHost = broadcast;
  if (prefix < 31) {
    firstHost = network + 1;
    lastHost = broadcast - 1;
  } else if (prefix === 32) {
    firstHost = network;
    lastHost = network;
  }

  return {
    ip,
    prefix,
    subnetMask: longToIp(mask),
    network: longToIp(network),
    broadcast: prefix < 31 ? longToIp(broadcast) : 'tidak berlaku',
    binary: {
      ip: toBinary(value),
      mask: toBinary(mask),
      network: toBinary(network),
    },
    total,
    usable,
    firstHost: longToIp(firstHost),
    lastHost: longToIp(lastHost),
    wildcard: longToIp(~mask >>> 0),
  };
}

export function validate(ip, prefix) {
  const octets = ip.trim().split('.');
  if (octets.length !== 4) {
    return 'Alamat IP harus terdiri dari 4 bagian.';
  }
  for (const o of octets) {
    if (!/^\d{1,3}$/.test(o) || parseInt(o, 10) > 255) {
      return 'Setiap bagian alamat IP harus angka 0 sampai 255.';
    }
  }
  if (prefix === '' || isNaN(Number(prefix)) || Number(prefix) < 0 || Number(prefix) > 32) {
    return 'Prefix harus angka 0 sampai 32.';
  }
  return null;
}