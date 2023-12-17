
export const DEFAULT_CONFIG = {
  ci: {
    default: false,
    aliases: []
  },
  docker: {
    default: false,
    aliases: ['dok', 'dkr', 'doker']
  },
  development: {
    default: true,
    aliases: ['d', 'dev', 'develop']
  },
  test: {
    default: false,
    aliases: ['t', 'tst', 'txt', 'text']
  },
  preview: {
    default: false,
    aliases: ['pre', 'prev', 'prep', 'preprom', 'preprod', 'stg', 'stage']
  },
  production: {
    default: false,
    aliases: ['p', 'prod', 'product']
  }
};