import { useState, useEffect } from 'react';

interface ReleaseAsset {
  name: string;
  download_count: number;
  [key: string]: unknown;
}

interface Release {
  tag_name: string;
  published_at: string;
  assets: ReleaseAsset[];
  [key: string]: unknown;
}

interface GitHubStats {
  totalDownloads: number;
  latestVersion: string;
  releaseCount: number;
}

interface UseGitHubStatsResult {
  stats: GitHubStats | null;
  loading: boolean;
  error: Error | null;
}

const REPO_OWNER = 'colinvkim';
const REPO_NAME = 'Radix';
const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`;

/**
 * Fetches real download stats from GitHub Releases API.
 * Sums download_count across all release assets.
 */
export function useGitHubStats(): UseGitHubStatsResult {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchStats() {
      try {
        const response = await fetch(GITHUB_API, {
          signal: abortController.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const releases: Release[] = await response.json();

        let totalDownloads = 0;
        for (const release of releases) {
          for (const asset of release.assets) {
            totalDownloads += asset.download_count;
          }
        }

        if (!abortController.signal.aborted) {
          setStats({
            totalDownloads,
            latestVersion: releases[0]?.tag_name ?? 'unknown',
            releaseCount: releases.length,
          });
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err : new Error('Failed to fetch GitHub stats'));
        setLoading(false);
      }
    }

    fetchStats();

    return () => {
      abortController.abort();
    };
  }, []);

  return { stats, loading, error };
}

/**
 * Formats a number into a human-readable string (e.g. 10500 → "10.5k")
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}k`;
  }
  return value.toString();
}
