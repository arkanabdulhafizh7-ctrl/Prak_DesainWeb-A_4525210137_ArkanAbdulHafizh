const form = document.getElementById('formRegistrasi');
const hasil = document.getElementById('hasil');

/* ---------- Aturan: usia minimal 17 tahun ---------- */
const tgl = document.getElementById('tgl_lahir');
const batas = new Date();
batas.setFullYear(batas.getFullYear() - 17);
tgl.max = batas.toISOString().split('T')[0];
tgl.addEventListener('input', () => {
  tgl.setCustomValidity(
    tgl.validity.rangeOverflow ? 'Usia minimal peserta adalah 17 tahun.' : ''
  );
});

/* ---------- Aturan: checkbox sesi minimal 1 ---------- */
const sesi = document.querySelectorAll('input[name="sesi[]"]');
function cekSesi() {
  const adaYangDipilih = [...sesi].some(c => c.checked);
  sesi[0].setCustomValidity(adaYangDipilih ? '' : 'Pilih minimal satu sesi workshop.');
}
sesi.forEach(c => c.addEventListener('change', cekSesi));
cekSesi();

/* ---------- Aturan: validasi file (tipe & ukuran maks 2 MB) ---------- */
const bukti = document.getElementById('bukti');
const MAKS = 2 * 1024 * 1024;
const EKSTENSI = ['jpg', 'jpeg', 'png', 'pdf'];
bukti.addEventListener('change', () => {
  bukti.setCustomValidity('');
  const f = bukti.files[0];
  if (!f) return;
  const ext = f.name.split('.').pop().toLowerCase();
  if (!EKSTENSI.includes(ext)) {
    bukti.setCustomValidity('Format file harus JPG, PNG, atau PDF.');
  } else if (f.size > MAKS) {
    bukti.setCustomValidity('Ukuran file maksimal 2 MB.');
  }
});

/* ---------- Penghitung karakter textarea ---------- */
const alasan = document.getElementById('alasan');
const hitung = document.getElementById('hitung');
alasan.addEventListener('input', () => {
  hitung.textContent = alasan.value.length;
});

/* ---------- Tampilkan SEMUA error sekaligus ---------- */
function terjemah(el) {
  const v = el.validity;
  if (v.customError) return el.validationMessage; // pesan custom (usia, sesi, file)
  if (v.valueMissing) {
    if (el.type === 'radio') return 'Pilih salah satu opsi.';
    if (el.type === 'checkbox') return 'Kolom ini wajib dicentang.';
    if (el.tagName === 'SELECT') return 'Pilih salah satu opsi.';
    if (el.type === 'file') return 'Pilih file terlebih dahulu.';
    return 'Kolom ini wajib diisi.';
  }
  if (v.typeMismatch) return 'Format ' + el.type + ' tidak valid.';
  if (v.badInput) return 'Isian tidak valid.';
  if (v.patternMismatch) return el.title || 'Format tidak sesuai.';
  if (v.tooShort) return `Minimal ${el.minLength} karakter (saat ini ${el.value.length}).`;
  if (v.tooLong) return `Maksimal ${el.maxLength} karakter.`;
  if (v.rangeUnderflow) return `Nilai minimal ${el.min}.`;
  if (v.rangeOverflow) return `Nilai maksimal ${el.max}.`;
  return el.validationMessage;
}

// Untuk radio & checkbox grup, pakai elemen pertama sebagai wakil grup
function wakil(el) {
  if (el.type === 'radio' || el.name === 'sesi[]') {
    return form.querySelector(`[name="${el.name}"]`);
  }
  return el;
}

function tampilkanError(el) {
  el = wakil(el);
  const wadah = el.closest('.field');
  let pesan = wadah.querySelector('.error-msg');
  if (!pesan) {
    pesan = document.createElement('span');
    pesan.className = 'error-msg';
    wadah.appendChild(pesan);
  }
  if (el.validity.valid) {
    pesan.textContent = '';
    el.classList.remove('invalid');
  } else {
    pesan.textContent = terjemah(el);
    el.classList.add('invalid');
  }
}

/* ---------- Ringkasan (tombol type="button") ---------- */
// Escape HTML agar input pengguna tidak dieksekusi sebagai script (XSS)
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function ambilRingkasan() {
  const d = new FormData(form);
  return `
    <strong>Ringkasan Pendaftaran</strong><br>
    Nama: ${esc(d.get('nama'))}<br>
    Email: ${esc(d.get('email'))}<br>
    Telepon: ${esc(d.get('telepon'))}<br>
    Kategori: ${esc(d.get('kategori'))}<br>
    Tiket: ${esc(d.get('jumlah_tiket'))}<br>
    Sesi: ${esc(d.getAll('sesi[]').join(', ') || '-')}<br>
    File: ${esc(bukti.files[0] ? bukti.files[0].name : '-')}`;
}
document.getElementById('btnRingkasan').addEventListener('click', () => {
  hasil.innerHTML = ambilRingkasan();
  hasil.hidden = false;
});

/* ---------- Submit ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  hasil.hidden = true;

  // Jalankan ulang validasi custom
  cekSesi();
  if (bukti.files[0]) bukti.dispatchEvent(new Event('change'));

  let pertamaInvalid = null;
  const sudahDicek = new Set();

  form.querySelectorAll('input, select, textarea').forEach((el) => {
    // radio & checkbox grup: cek sekali per name
    if (el.type === 'radio' || el.name === 'sesi[]') {
      if (sudahDicek.has(el.name)) return;
      sudahDicek.add(el.name);
    }
    tampilkanError(el);
    if (!wakil(el).validity.valid && !pertamaInvalid) pertamaInvalid = wakil(el);
  });

  if (pertamaInvalid) {
    pertamaInvalid.focus();
    return; // berhenti, masih ada error
  }

  // Semua valid
  hasil.innerHTML = '✅ Data valid dan siap dikirim.<br><br>' + ambilRingkasan();
  hasil.hidden = false;
  // Jika backend (proses.php) sudah ada, aktifkan baris ini:
  // form.submit();
});

/* Perbarui pesan error saat pengguna memperbaiki isian */
form.addEventListener('input', (e) => {
  if (e.target.matches('input, select, textarea')) tampilkanError(e.target);
});
form.addEventListener('change', (e) => {
  if (e.target.matches('input, select, textarea')) tampilkanError(e.target);
});

/* ---------- Tombol Reset: konfirmasi agar tidak terhapus tidak sengaja ---------- */
document.getElementById('btnReset').addEventListener('click', (e) => {
  if (!confirm('Yakin ingin menghapus semua isian?')) e.preventDefault();
});
form.addEventListener('reset', () => {
  hasil.hidden = true;
  hitung.textContent = '0';
  document.querySelectorAll('.error-msg').forEach(p => p.textContent = '');
  document.querySelectorAll('.invalid').forEach(i => i.classList.remove('invalid'));
  setTimeout(() => {
    bukti.setCustomValidity('');
    tgl.setCustomValidity('');
    cekSesi();
  }, 0);
});