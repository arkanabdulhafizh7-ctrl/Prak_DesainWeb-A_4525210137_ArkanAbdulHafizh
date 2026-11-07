const form = document.getElementById('formDaftar');
const summary = document.getElementById('summary');
const preview = document.getElementById('preview');
const alasan = document.getElementById('alasan');
const hitung = document.getElementById('hitung');

const MAX_FILE = 2 * 1024 * 1024; // 2 MB
const EXT_OK = ['jpg', 'jpeg', 'png', 'pdf'];

alasan.addEventListener('input', () => { hitung.textContent = alasan.value.length; });

// Setiap fungsi mengembalikan pesan error, atau '' jika valid
const aturan = {
  nama() {
    const v = form.nama.value.trim();
    if (!v) return 'Nama wajib diisi.';
    if (v.length < 3) return 'Nama minimal 3 karakter.';
    if (!/^[A-Za-z\s.'-]+$/.test(v)) return 'Nama hanya boleh berisi huruf dan spasi.';
    return '';
  },
  email() {
    const v = form.email.value.trim();
    if (!v) return 'Email wajib diisi.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Format email tidak valid, contoh: nama@email.com.';
    return '';
  },
  telepon() {
    const v = form.telepon.value.trim();
    if (!v) return 'Nomor telepon wajib diisi.';
    if (!/^\d+$/.test(v)) return 'Nomor telepon hanya boleh berisi angka.';
    if (!/^08\d{8,11}$/.test(v)) return 'Nomor harus diawali 08 dan 10 sampai 13 digit.';
    return '';
  },
  kursus() {
    return form.kursus.value ? '' : 'Pilih salah satu kursus.';
  },
  kelas() {
    return form.querySelector('input[name="kelas"]:checked') ? '' : 'Pilih salah satu kelas.';
  },
  materi() {
    return form.querySelectorAll('input[name="materi"]:checked').length ? '' : 'Pilih minimal satu materi tambahan.';
  },
  alasan() {
    const v = form.alasan.value.trim();
    if (!v) return 'Alasan wajib diisi.';
    if (v.length < 20) return 'Alasan minimal 20 karakter (saat ini ' + v.length + ').';
    return '';
  },
  bukti() {
    const f = form.bukti.files[0];
    if (!f) return 'Bukti pembayaran wajib diunggah.';
    const ext = f.name.split('.').pop().toLowerCase();
    if (!EXT_OK.includes(ext)) return 'Format file harus JPG, PNG, atau PDF.';
    if (f.size > MAX_FILE) return 'Ukuran file maksimal 2 MB.';
    return '';
  },
  setuju() {
    return form.setuju.checked ? '' : 'Anda harus menyetujui syarat dan ketentuan.';
  }
};

const label = {
  nama: 'Nama', email: 'Email', telepon: 'Telepon', kursus: 'Kursus', kelas: 'Kelas',
  materi: 'Materi tambahan', alasan: 'Alasan', bukti: 'Bukti pembayaran', setuju: 'Persetujuan'
};

function tampilError(nama, pesan) {
  document.getElementById('err-' + nama).textContent = pesan;
  const el = form.elements[nama];
  const target = (el && el.length === undefined) ? el : null; // radio/checkbox group tidak diberi border
  if (target) target.classList.toggle('invalid', !!pesan);
  if (target) target.setAttribute('aria-invalid', pesan ? 'true' : 'false');
}

function validasiSemua() {
  const daftar = [];
  Object.keys(aturan).forEach(k => {
    const pesan = aturan[k]();
    tampilError(k, pesan);
    if (pesan) daftar.push({ field: k, pesan });
  });
  return daftar;
}

function tampilRingkasan(daftar) {
  if (daftar.length === 0) {
    summary.className = 'show ok';
    summary.textContent = 'Pendaftaran berhasil. Data Anda sudah memenuhi semua aturan validasi.';
    return;
  }
  summary.className = 'show err';
  summary.innerHTML = '<strong>' + daftar.length + ' isian perlu diperbaiki:</strong><ul>' +
    daftar.map(d => '<li>' + label[d.field] + ': ' + d.pesan + '</li>').join('') + '</ul>';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  preview.classList.remove('show');
  const daftar = validasiSemua();
  tampilRingkasan(daftar);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (daftar.length) {
    const pertama = form.elements[daftar[0].field];
    if (pertama && pertama.focus && pertama.length === undefined) pertama.focus();
  }
  // Jika valid, data akan dikirim ke server (fetch/POST). Server tetap harus memvalidasi ulang.
});

// Validasi saat pindah kolom (blur) agar pengguna langsung tahu kesalahannya
['nama', 'email', 'telepon', 'kursus', 'alasan', 'bukti'].forEach(k => {
  form.elements[k].addEventListener('blur', () => tampilError(k, aturan[k]()));
});
form.querySelectorAll('input[name="kelas"]').forEach(r => r.addEventListener('change', () => tampilError('kelas', aturan.kelas())));
form.querySelectorAll('input[name="materi"]').forEach(c => c.addEventListener('change', () => tampilError('materi', aturan.materi())));
form.setuju.addEventListener('change', () => tampilError('setuju', aturan.setuju()));

document.getElementById('btnPreview').addEventListener('click', () => {
  const materi = [...form.querySelectorAll('input[name="materi"]:checked')].map(c => c.value).join(', ') || '-';
  const kelas = (form.querySelector('input[name="kelas"]:checked') || {}).value || '-';
  const f = form.bukti.files[0];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  preview.innerHTML = '<dl>' +
    '<dt>Nama</dt><dd>' + esc(form.nama.value || '-') + '</dd>' +
    '<dt>Email</dt><dd>' + esc(form.email.value || '-') + '</dd>' +
    '<dt>Telepon</dt><dd>' + esc(form.telepon.value || '-') + '</dd>' +
    '<dt>Kursus</dt><dd>' + esc(form.kursus.selectedOptions[0].text) + '</dd>' +
    '<dt>Kelas</dt><dd>' + esc(kelas) + '</dd>' +
    '<dt>Materi tambahan</dt><dd>' + esc(materi) + '</dd>' +
    '<dt>Alasan</dt><dd>' + esc(form.alasan.value || '-') + '</dd>' +
    '<dt>Bukti pembayaran</dt><dd>' + (f ? esc(f.name) : '-') + '</dd></dl>';
  preview.classList.add('show');
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    Object.keys(aturan).forEach(k => tampilError(k, ''));
    summary.className = '';
    preview.classList.remove('show');
    hitung.textContent = '0';
  }, 0);
});
