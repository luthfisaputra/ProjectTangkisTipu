import { useState } from 'react'

// Menu samping admin — satu sumber kebenaran untuk semua halaman admin
// (Dashboard, Set Soal, dll) supaya tampilan & pemicu navigasinya konsisten.
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid_view', path: 'admin' },
  { id: 'set-soal', label: 'Set Soal', icon: 'quiz', path: 'set-soal' },
  { id: 'kode-kelas', label: 'Kode Kelas', icon: 'school', path: 'kode-kelas' },
  { id: 'pengaturan', label: 'Pengaturan', icon: 'settings', path: null },
]

export default function AdminShell({ active = 'dashboard', onNavigate = () => {}, onKeluar = () => {}, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pilihMenu = (item) => {
    if (!item.path) {
      window.alert(`Halaman "${item.label}" belum tersedia pada versi demo ini.`)
      return
    }
    if (item.path !== active) onNavigate(item.path)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-surface-cream font-body-md text-on-surface antialiased">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-white z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-white">
            <img src="/assets/LogoTangkis.png" alt="Logo TangkisTipu" className="h-9 w-auto shrink-0" />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary tracking-tight leading-none">TangkisTipu</span>
              <span className="font-label-sm text-label-sm text-text-muted mt-space-xs">Portal Admin</span>
            </div>
            <button
              aria-label="Tutup menu samping"
              className="ml-auto w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0"
              onClick={() => setSidebarOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
          </div>

          <div className="px-space-md py-space-sm">
            <div className="px-space-sm py-space-xs text-label-sm font-label-sm text-text-muted uppercase tracking-wider">
              Manajemen Edukasi
            </div>
          </div>

          <nav className="flex flex-col gap-space-xs px-space-md">
            {NAV_ITEMS.map((item) => (
              <button
                aria-current={item.id === active ? 'page' : undefined}
                className={
                  item.id === active
                    ? 'flex items-center gap-space-md px-space-md py-3 transition-all bg-primary-container text-on-primary font-label-md rounded-xl shadow-sm text-left'
                    : 'flex items-center gap-space-md px-space-md py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left'
                }
                key={item.id}
                onClick={() => pilihMenu(item)}
                type="button"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-space-md bg-surface-white">
          <div className="p-space-md rounded-xl bg-surface-cream flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate">Rudi Hariyadi</span>
                <span className="font-label-sm text-label-sm text-text-muted truncate">Ketua Komunitas</span>
              </div>
            </div>
            <button
              className="p-space-xs rounded-lg text-text-muted hover:text-error hover:bg-danger-red-light transition-colors"
              onClick={onKeluar}
              title="Keluar Akun"
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Tombol hamburger — menempel di pojok kiri atas konten, ikut scroll, hilang saat sidebar terbuka */}
      {!sidebarOpen && (
        <button
          aria-label="Buka menu samping"
          className="absolute top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          onClick={() => setSidebarOpen(true)}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      )}

      {/* Backdrop (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Konten halaman */}
      <div className={sidebarOpen ? 'md:pl-72' : ''}>{children}</div>
    </div>
  )
}
