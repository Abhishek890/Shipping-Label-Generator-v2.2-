// Environment configuration
export const env = {
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN,
    hasWriteAccess: Boolean(import.meta.env.VITE_GITHUB_TOKEN)
  }
};