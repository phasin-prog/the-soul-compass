import {
  ArrowRight,
  AlignLeft,
  Archive,
  BookOpen,
  BookOpenText,
  Brain,
  BrainCircuit,
  ChevronDown,
  CircleDot,
  CircleAlert,
  CircleHelp,
  Check,
  Compass,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Folder,
  Footprints,
  GitBranch,
  History,
  HardDrive,
  Image,
  House,
  Landmark,
  Languages,
  Layers,
  Link2,
  ListChecks,
  LoaderCircle,
  Lock,
  Menu,
  Network,
  Quote,
  Scale,
  ScrollText,
  Search,
  Send,
  Save,
  SlidersHorizontal,
  Sparkles,
  StickyNote,
  SunMoon,
  Tags,
  Trash2,
  TriangleAlert,
  Type,
  Upload,
  Waypoints,
  X,
  type LucideIcon,
} from 'lucide-react';

const soulIcons = {
  psyche: Brain,
  philosophy: Landmark,
  psychology: BrainCircuit,
  archetype: Layers,
  symbol: Sparkles,
  self: CircleDot,
  shadow: EyeOff,
  animaAnimus: Scale,
  individuation: Waypoints,
  complex: GitBranch,
  article: FileText,
  note: StickyNote,
  quote: Quote,
  source: ScrollText,
  book: BookOpen,
  definition: BookOpenText,
  concept: CircleDot,
  comparison: Scale,
  timeline: History,
  map: Network,
  warning: TriangleAlert,
  alert: CircleAlert,
  question: CircleHelp,
  practice: Footprints,
  compass: Compass,
  home: House,
  search: Search,
  menu: Menu,
  close: X,
  language: Languages,
  theme: SunMoon,
  external: ExternalLink,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  saved: Check,
  saving: LoaderCircle,
  error: TriangleAlert,
  cover: Image,
  upload: Upload,
  title: Type,
  slug: Link2,
  excerpt: AlignLeft,
  body: FileText,
  metadata: SlidersHorizontal,
  category: Folder,
  depth: Layers,
  tags: Tags,
  seo: Search,
  preview: Eye,
  save: Save,
  publish: Send,
  auth: Lock,
  database: Database,
  storage: HardDrive,
  validation: ListChecks,
  revision: History,
  archive: Archive,
  remove: Trash2,
} satisfies Record<string, LucideIcon>;

export type SoulIconName = keyof typeof soulIcons;

interface SoulIconProps {
  name: SoulIconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  decorative?: boolean;
  title?: string;
}

export function SoulIcon({
  name,
  size = 20,
  strokeWidth = 1.75,
  className,
  decorative,
  title,
}: SoulIconProps) {
  const Icon = soulIcons[name];
  const isDecorative = decorative ?? !title;
  const accessibleTitle = title ?? name;

  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : accessibleTitle}
      role={isDecorative ? undefined : 'img'}
      focusable="false"
    >
      {isDecorative ? null : <title>{accessibleTitle}</title>}
    </Icon>
  );
}
