import { env } from '../../config/env';
import { githubConfig } from '../../config/github';

interface GitHubResponse {
  content: string;
  sha: string;
}

export async function fetchFileContent(): Promise<GitHubResponse> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json'
  };

  if (env.github.token) {
    headers['Authorization'] = `Bearer ${env.github.token}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}`,
    { headers }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return { content: '[]', sha: '' };
    }
    throw new Error('Failed to fetch addresses');
  }

  const data = await response.json();
  return {
    content: atob(data.content),
    sha: data.sha
  };
}

export async function updateFile(content: string, sha?: string): Promise<void> {
  if (!env.github.hasWriteAccess) {
    console.warn('No GitHub token found or insufficient permissions');
    return;
  }

  const body = {
    message: 'Update addresses',
    content: btoa(content),
    branch: githubConfig.branch,
    ...(sha && { sha })
  };

  const response = await fetch(
    `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${env.github.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update addresses');
  }
}