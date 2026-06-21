import type { Logger } from '@opentelemetry/api-logs';
import { logs } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';

declare global {
  var __posthogLogger: Logger | undefined;
}

let loggerProvider: LoggerProvider | null | undefined;

function createLoggerProvider(): LoggerProvider | null {
  const token = process.env.POSTHOG_PROJECT_TOKEN;

  if (!token) return null;

  const exporter = new OTLPLogExporter({
    url:
      process.env.POSTHOG_LOGS_ENDPOINT ||
      'https://us.i.posthog.com/i/v1/logs',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const attributes: Record<string, string> = {
    'service.name': process.env.OTEL_SERVICE_NAME || 'the-souls-compass',
    'deployment.environment':
      process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
  };

  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    attributes['service.version'] = process.env.VERCEL_GIT_COMMIT_SHA;
  }

  return new LoggerProvider({
    resource: resourceFromAttributes(attributes),
    processors: [new BatchLogRecordProcessor(exporter)],
  });
}

export function getPostHogLoggerProvider(): LoggerProvider | null {
  if (loggerProvider === undefined) {
    loggerProvider = createLoggerProvider();
  }

  return loggerProvider;
}

export function registerPostHogLogs(): void {
  const provider = getPostHogLoggerProvider();
  if (!provider) return;

  logs.setGlobalLoggerProvider(provider);
  globalThis.__posthogLogger = provider.getLogger(
    process.env.OTEL_SERVICE_NAME || 'the-souls-compass'
  );
}
