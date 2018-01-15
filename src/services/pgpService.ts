import openpgp from 'openpgp';

export function generatePGPKeys(options: {}) {
  return openpgp.generateKey(options).then((key: { privateKeyArmored: string; publicKeyArmored: string }) => ({
    publicKey: key.publicKeyArmored,
    privateKey: key.privateKeyArmored
  }));
}
