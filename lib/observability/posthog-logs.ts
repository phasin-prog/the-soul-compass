import 'server-only';

import {
  SeverityNumber,
  type LogAttributes,
} from '@opentelemetry/api-logs';
import { after } from 'next/server';
import { getPostHogLoggerProvider } from '@/instrumentation.node';

type LogLevel = 'info' | 'warn' | 'error';

const severityByLevel: Record<LogLevel, SeverityNumber> = {
  info: SeverityNumber.INFO,
  warn: SeverityNumber.WARN,
  error: SeverityNumber.ERROR,
};

export function schedulePostHogLog(
  level: LogLevel,
  body: string,
  attributes: LogAttributes = {}
): void {
  const provider = getPostHogLoggerProvider();
  if (!provider) return;

  const logger =
    globalThis.__posthogLogger ||
    provider.getLogger(process.env.OTEL_SERVICE_NAME || 'the-souls-compass');

  try {
    logger.emit({
      body,
      severityNumber: severityByLevel[level],
      severityText: level.toUpperCase(),
      attributes,
    });
  } catch (error) {
    console.error(
      '[observability] Failed to emit log event.',
      error instanceof Error ? error.message : error
    );
    return;
  }

  after(async () => {
    try {
      await provider.forceFlush();
    } catch (error) {
      console.error(
        '[observability] Failed to flush PostHog logs.',
        error instanceof Error ? error.message : error
      );
    }
  });
}
