
export default function ProjectsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-lg bg-gray-900/5 dark:bg-black/30 backdrop-blur-lg">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Nenhum projeto encontrado
          </h3>
          <p className="text-sm text-muted-foreground">
            Seus projetos serão listados aqui.
          </p>
        </div>
      </div>
    </>
  );
}
