import DropdownPilihan from './DropdownPilihan.jsx'
import SetSoalQuestionForm from './SetSoalQuestionForm.jsx'
import SetSoalQuestionList from './SetSoalQuestionList.jsx'
import { DAFTAR_KODE_KELAS, JALUR_META, MAKS_SOAL, STATUS_META, TIPE_META } from '../data/setSoal.js'

const INPUT =
  'w-full h-12 px-4 rounded-xl border-0 bg-surface-cream text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container shadow-sm'

export default function SetSoalEditor({
  set = null,
  onUbahSet = () => {},
  daftarSoal = [],
  idxSoal = 0,
  onPilihSoal = () => {},
  onTambahSoal = () => {},
  onHapusSoal = () => {},
  onUbahSoal = () => {},
  onUbahOpsi = () => {},
  onPilihKunci = () => {},
  onPerbarui = () => {},
  onSimpanDraf = () => {},
  onRilis = () => {},
  onSisipTautan = () => {},
}) {
  if (!set) {
    return (
      <section className="bg-surface-white rounded-xl p-space-2xl text-center shadow-sm">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-space-sm">
          <span aria-hidden="true" className="material-symbols-outlined text-[40px] text-primary-container">draft</span>
          <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Belum Ada Set Soal Dipilih</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Pilih tombol sunting pada tabel di atas, atau buat set soal baru untuk mulai menyusun pertanyaan.
          </p>
        </div>
      </section>
    )
  }

  const soal = daftarSoal[idxSoal] || null
  const status = STATUS_META[set.status]
  const jumlah = daftarSoal.length
  const penuh = jumlah >= MAKS_SOAL
  const galatTutup = Boolean(set.rilis && set.tutup && set.tutup < set.rilis)

  // Di soal terakhir: kalau masih ada kuota, tombol "selanjutnya" berubah
  // menjadi tambah soal baru (perubahan soal aktif ikut tersimpan otomatis).
  const lanjut = () => {
    if (idxSoal < jumlah - 1) onPilihSoal(idxSoal + 1)
    else onTambahSoal()
  }

  return (
    <section className="flex flex-col rounded-xl bg-surface-container-low shadow-md overflow-hidden scroll-mt-20" id="editor-set-soal">
      {/* Bilah aksi lengket */}
      <div className="sticky top-0 z-30 bg-surface-container-low/95 backdrop-blur-md px-space-xl py-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[22px]">draw</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate">
                Mengedit Set: {set.nama}
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${status.pill}`}>
                <span aria-hidden="true" className="material-symbols-outlined text-[12px]">{status.icon}</span>
                {status.label}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-text-muted">
              ID: {set.id} • Perubahan tersimpan otomatis
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm self-stretch md:self-auto justify-end flex-wrap">
          <button
            className="h-12 px-space-lg rounded-xl bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors flex items-center gap-space-xs cursor-pointer"
            onClick={onSimpanDraf}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">save</span>
            <span>Simpan Draf</span>
          </button>
          <button
            className="h-12 px-space-xl rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all duration-200 shadow-sm flex items-center gap-space-xs cursor-pointer"
            onClick={onRilis}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">send_time_extension</span>
            <span>Jadwalkan &amp; Rilis</span>
          </button>
        </div>
      </div>

      {/* Konfigurasi parameter set */}
      <div className="p-space-xl bg-surface-white flex flex-col gap-space-md">
        <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Konfigurasi Parameter Set</span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-start">
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-judul">Judul Modul Set Soal</label>
            <input className={INPUT} id="set-judul" onChange={(e) => onUbahSet('nama', e.target.value)} type="text" value={set.nama} />
          </div>

          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-jalur">Target Jalur</label>
            <DropdownPilihan
              id="set-jalur"
              nilai={set.jalur}
              onChange={(v) => onUbahSet('jalur', v)}
              opsi={Object.entries(JALUR_META).map(([value, m]) => ({ value, label: `${m.label} (${m.usia})` }))}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-tipe">Tipe Evaluasi</label>
            <DropdownPilihan
              id="set-tipe"
              nilai={set.tipe}
              onChange={(v) => onUbahSet('tipe', v)}
              opsi={Object.entries(TIPE_META).map(([value, m]) => ({ value, label: m.label }))}
            />
          </div>

          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-rilis">Tanggal Rilis</label>
            <input className={`${INPUT} cursor-pointer`} id="set-rilis" onChange={(e) => onUbahSet('rilis', e.target.value)} type="date" value={set.rilis} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-start">
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-kelas">Kode Kelas</label>
            <input
              className={INPUT}
              id="set-kelas"
              list="daftar-kode-kelas"
              onChange={(e) => onUbahSet('kodeKelas', e.target.value.toUpperCase())}
              placeholder="Contoh: PR-0102"
              type="text"
              value={set.kodeKelas || ''}
            />
            <datalist id="daftar-kode-kelas">
              {DAFTAR_KODE_KELAS.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
            <span className="font-body-sm text-body-sm text-text-muted">Set hanya bisa dikerjakan peserta dengan kode ini.</span>
          </div>

          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="set-tutup">Tanggal Tutup</label>
            <input
              className={`${INPUT} cursor-pointer ${galatTutup ? 'ring-2 ring-danger-red' : ''}`}
              id="set-tutup"
              min={set.rilis || undefined}
              onChange={(e) => onUbahSet('tutup', e.target.value)}
              type="date"
              value={set.tutup || ''}
            />
            <span className={`font-body-sm text-body-sm ${galatTutup ? 'text-danger-red' : 'text-text-muted'}`}>
              {galatTutup ? 'Tanggal tutup tidak boleh sebelum tanggal rilis.' : 'Kosongkan bila set tidak pernah ditutup.'}
            </span>
          </div>
        </div>

        {set.tipe === 'retensi' && (
          <div className="p-space-md rounded-xl bg-warning-yellow-light text-on-surface flex items-start gap-space-md shadow-sm">
            <span aria-hidden="true" className="material-symbols-outlined text-[24px] text-secondary mt-0.5">info</span>
            <div className="flex flex-col gap-0.5">
              <span className="font-label-md text-label-md text-secondary">Ketentuan Khusus Tipe Tes Ulang (Spaced Repetition)</span>
              <p className="font-body-sm text-body-sm text-on-surface">
                Set ini terbuka otomatis <strong className="font-label-md">minimal 14 hari</strong> setelah peserta
                menyelesaikan post-test. Tujuannya menguji daya tahan ingatan materi tanpa pengingat, sehingga literasi
                keamanan siber benar-benar terserap.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dua kolom: daftar soal + form soal aktif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl p-space-xl items-start bg-surface-cream">
        <div className="lg:col-span-4">
          <SetSoalQuestionList
            aktif={idxSoal}
            onPilih={onPilihSoal}
            onTambah={onTambahSoal}
            soal={daftarSoal}
          />
        </div>

        <div className="lg:col-span-8">
          {soal ? (
            <SetSoalQuestionForm
              nomor={idxSoal + 1}
              onHapus={onHapusSoal}
              onPilihKunci={onPilihKunci}
              onSebelumnya={() => onPilihSoal(Math.max(0, idxSoal - 1))}
              onUbah={onUbahSoal}
              onUbahOpsi={onUbahOpsi}
              onPerbarui={onPerbarui}
              onSelanjutnya={lanjut}
              onSisipTautan={onSisipTautan}
              penuh={penuh}
              soal={soal}
              total={jumlah}
            />
          ) : (
            <div className="bg-surface-white p-space-xl rounded-xl shadow-sm text-center font-body-md text-body-md text-text-muted">
              Belum ada soal untuk disunting. Tambahkan soal pertama melalui tombol di kolom kiri.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
