import { useEffect, useRef, useState } from 'react'

// Dropdown custom berbasis tombol + daftar pilihan.
// Menggantikan <select> bawaan browser supaya tampilan (termasuk menu
// yang terbuka) mengikuti token warna/rapat proyek, bukan gaya sistem.
export default function DropdownPilihan({
  id,
  nilai,
  onChange = () => {},
  opsi = [],
  className = '',
  minItemWidth = false,
}) {
  const [buka, setBuka] = useState(false)
  const kotak = useRef(null)
  const terpilih = opsi.find((o) => o.value === nilai) || opsi[0]

  useEffect(() => {
    if (!buka) return
    const diLuarkan = (e) => {
      if (kotak.current && !kotak.current.contains(e.target)) setBuka(false)
    }
    const tekanEsc = (e) => {
      if (e.key === 'Escape') setBuka(false)
    }
    document.addEventListener('mousedown', diLuarkan)
    document.addEventListener('keydown', tekanEsc)
    return () => {
      document.removeEventListener('mousedown', diLuarkan)
      document.removeEventListener('keydown', tekanEsc)
    }
  }, [buka])

  return (
    <div className={`relative ${className}`} ref={kotak}>
      <button
        aria-expanded={buka}
        aria-haspopup="listbox"
        className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-cream text-on-surface font-label-md text-label-md text-left flex items-center focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm cursor-pointer hover:bg-surface-container-low transition-colors"
        id={id}
        onClick={() => setBuka((b) => !b)}
        type="button"
      >
        <span className="truncate">{terpilih?.label}</span>
      </button>
      <span
        aria-hidden="true"
        className={`material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[20px] text-text-muted transition-transform duration-200 ${buka ? 'rotate-180' : ''}`}
      >
        expand_more
      </span>

      {buka && (
        <ul
          className="absolute z-40 mt-1 min-w-full max-h-64 overflow-y-auto rounded-xl bg-surface-white p-1 shadow-lg border border-surface-container-high pop-in"
          role="listbox"
        >
          {opsi.map((o) => {
            const dipilih = o.value === nilai
            return (
              <li key={o.value}>
                <button
                  aria-selected={dipilih}
                  className={`w-full text-left px-space-md py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-between gap-space-sm transition-colors ${
                    dipilih
                      ? 'bg-surface-container-low text-primary'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                  onClick={() => {
                    onChange(o.value)
                    setBuka(false)
                  }}
                  role="option"
                  type="button"
                >
                  <span className="truncate">{o.label}</span>
                  {dipilih && (
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary shrink-0">
                      check
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
