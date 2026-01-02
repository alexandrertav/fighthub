import { cn } from '@/lib/utils';

export type StripedPatternProps = {
  className?: string;
  color?: string;
  opacity?: number;
};

export default function StripedPattern({
  className = '',
  color = 'currentColor',
  opacity = 0.05
}: StripedPatternProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${color} 10px, ${color} 11px)`,
        opacity
      }}
    />
  );
}
