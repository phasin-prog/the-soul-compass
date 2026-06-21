import { Badge } from './ui/Badge';

interface WarningBannerProps {
  message: string;
  description?: string;
}

export function WarningBanner({ message, description }: WarningBannerProps) {
  return (
    <div className="mb-8 rounded-xl border border-accent/35 bg-accent-soft p-6">
      <div className="flex items-start gap-3">
        <Badge variant="accent" className="shrink-0">
          ⚠
        </Badge>
        <div>
          <p className="mb-1 font-medium text-accent">{message}</p>
          {description && (
            <p className="text-sm text-text-soft">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
