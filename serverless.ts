import type { AWS } from '@serverless/typescript'

import outlays from '@functions/outlays'

const serverlessConfiguration: AWS = {
  service: 'api-outlays-notion-sync',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NOTION_ACCESS_TOKEN: '${env:NOTION_ACCESS_TOKEN}',
      NOTION_NAME_PROPERTY_KEY: '${env:NOTION_NAME_PROPERTY_KEY}',
      NOTION_DATE_PROPERTY_KEY: '${env:NOTION_DATE_PROPERTY_KEY}',
      NOTION_TAGS_PROPERTY_KEY: '${env:NOTION_TAGS_PROPERTY_KEY}',
      NOTION_PRICE_PROPERTY_KEY: '${env:NOTION_PRICE_PROPERTY_KEY}',
      NOTION_PAYMENT_METHOD_PROPERTY_KEY: '${env:NOTION_PAYMENT_METHOD_PROPERTY_KEY}',
      NOTION_PURCHASE_YEAR_PROPERTY_KEY: '${env:NOTION_PURCHASE_YEAR_PROPERTY_KEY}',
      NOTION_CARD_PAYMENTS_PROPERTY_KEY: '${env:NOTION_CARD_PAYMENTS_PROPERTY_KEY}',
      NOTION_OUTLAYS_DATABASE_ID: '${env:NOTION_OUTLAYS_DATABASE_ID}',
      NOTION_YEARS_DATABASE_ID: '${env:NOTION_YEARS_DATABASE_ID}',
      NOTION_YEARS_NAME_PROPERTY_KEY: '${env:NOTION_YEARS_NAME_PROPERTY_KEY}',
      NOTION_CARD_PAYMENTS_DATABASE_ID: '${env:NOTION_CARD_PAYMENTS_DATABASE_ID}',
      NOTION_CARD_PAYMENTS_NAME_PROPERTY_KEY: '${env:NOTION_CARD_PAYMENTS_NAME_PROPERTY_KEY}',
    },
  },
  // import the function via paths
  functions: { outlays },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
}

module.exports = serverlessConfiguration
