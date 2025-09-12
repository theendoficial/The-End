
export default function DocumentsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Documentos</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Nenhum documento encontrado
          </h3>
          <p className="text-sm text-muted-foreground">
            Seus documentos importantes serão listados aqui.
          </p>
        </div>
      </div>
    </>
  );
}
