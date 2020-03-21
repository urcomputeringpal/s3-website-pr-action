export default (requiredEnvVars: string[]) => {
  console.log('Checking environment variables...');

  const missingList: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingList.push(envVar);
    }
  }

  if (missingList.length >= 1) {
    throw `The following env vars are missing but are required. ${missingList.join(
      ', '
    )}`;
  }

  return true;
};
