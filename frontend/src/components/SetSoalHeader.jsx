export default function SetSoalHeader({ onBuatBaru = () => {} }) {
  return (
    <section className="flex flex-col gap-space-md">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-text-muted">
        <span>Admin</span>
        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span>Manajemen Edukasi</span>
        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-label-md">Kelola Set Soal</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span aria-hidden="true" className="w-2.5 h-7 rounded-full bg-primary-container inline-block"></span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Kelola Set Soal Simulasi &amp; Evaluasi
            </h1>
          </div>
          <p className="font-body-md text-body-md text-text-muted pl-space-md">
            Atur bank soal pre-test, post-test, dan tes ulang 14 hari untuk jalur Anak &amp; Remaja, Dewasa, dan
            Lansia dalam satu tempat.
          </p>
        </div>

        <button
          className="h-12 px-space-xl bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md hover:bg-primary transition-all duration-200 self-start lg:self-auto cursor-pointer"
          onClick={onBuatBaru}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Buat Soal</span>
        </button>
      </div>
    </section>
  )
}
