module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'develop',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'alpha',
      prerelease: true
    }
  ],
  ci: true,
  dryRun: false,
  debug: true,
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        {
          type: 'feat',
          release: 'major'
        },
        {
          type: 'fix',
          release: 'minor'
        },
        {
          type: 'docs',
          release: 'patch'
        },
        {
          type: 'cleanup',
          release: 'patch'
        },
        {
          type: 'chore',
          release: 'patch'
        }
      ],
      parserOpts: {
        // Optional, only you want to have emoji commit support
        headerPattern: /^(?:\S*)?\s*(\w*)(?:\(\w+\):[\s\w]*)?$/,
        headerCorrespondence: ['type'],
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
      }
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ]
};
