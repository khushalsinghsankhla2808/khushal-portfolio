export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      
      {/* Aurora / Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen opacity-60 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[60%] w-[50vw] h-[50vw] rounded-full bg-highlight/5 blur-[100px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-grid" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)', maskImage: 'linear-gradient(to bottom, white, transparent)' }} />
      
      {/* Fine Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay z-10" />

    </div>
  );
}
