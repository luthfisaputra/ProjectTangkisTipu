// Header halaman Kode Kelas — pola sama dengan header halaman Set Soal.
// Tombol utama hanya pintasan: pembuatan kode kelas dilakukan di halaman
// Set Soal (kolom Kode Kelas pada form "Buat Soal" / konfigurasi set).
export default function KodeKelasHeader({ onBuatKode = () => {} }) {
  return (
    <section className="flex flex-col gap-space-md">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-text-muted">
        <span>Admin</span>
        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span>Manajemen Komunitas</span>
        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-label-md">Kode Kelas &amp; Hasil</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span aria-hidden="true" className="w-2.5 h-7 rounded-full bg-primary-container inline-block"></span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Kelola Kode Kelas &amp; Hasil Kelompok
            </h1>
          </div>
          <p className="font-body-md text-body-md text-text-muted pl-space-md">
            Pantau progres belajar tiap kelompok komunitas secara anonim. Kode kelas dibuat dari halaman
            Set Soal dan otomatis terdaftar di sini.
          </p>
        </div>

        <button
          className="h-12 px-space-xl bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-md hover:bg-primary transition-all duration-200 self-start lg:self-auto cursor-pointer"
          onClick={onBuatKode}
          title="Buat kode kelas lewat halaman Set Soal"
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Buat Kode di Set Soal</span>
        </button>
      </div>
    </section>
  )
}
