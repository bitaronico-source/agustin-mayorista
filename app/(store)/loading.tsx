export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-navy-700 border-t-gold-500" />
        <p className="text-sm font-bold uppercase tracking-widest text-white/50">
          Cargando...
        </p>
      </div>
    </div>
  );
}