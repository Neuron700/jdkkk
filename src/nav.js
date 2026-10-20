export const PAGES = [
  { slug: '', title: 'Beranda', desc: 'Pengantar materi jaringan' },
  { slug: 'ipv4', title: 'IPv4', desc: 'Struktur alamat dan pengelompokan' },
  { slug: 'subnetting', title: 'Subnetting', desc: 'Pembagian network menjadi subnet' },
  { slug: 'virtualbox', title: 'VirtualBox', desc: 'Lab virtual dan mode jaringan' },
  { slug: 'debian-cli', title: 'Debian CLI', desc: 'Perintah dasar Linux' },
  { slug: 'debian-jaringan', title: 'Debian Jaringan', desc: 'Konfigurasi jaringan di Debian' },
  { slug: 'kalkulator', title: 'Kalkulator', desc: 'Hitung subnet langsung' },
];

export function neighbors(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  const slugs = PAGES.map((p) => p.slug);
  const index = slugs.indexOf(clean === '' ? '' : clean.slice(1));
  return {
    prev: index > 0 ? PAGES[index - 1] : null,
    next: index >= 0 && index < PAGES.length - 1 ? PAGES[index + 1] : null,
  };
}