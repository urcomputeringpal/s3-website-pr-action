export default (filePath: string) =>
  filePath.replace(/^(\\|\/)+/g, '').replace(/\\/g, '/');
