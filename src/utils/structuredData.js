export function injectLDJson() {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cindy Zody — Communications Practitioner',
    'description': 'NVC/IFS individual & group facilitation, mindfulness and attitudinal healing.',
    'image': '/favicon.svg',
    'email': 'mailto:cindyzody@gmail.com',
    'telephone': '+1-206-992-5992',
    'areaServed': ['Seattle WA', 'Remote'],
    'url': import.meta.env.VITE_SITE_URL || '/',
    'sameAs': []
  })
  document.head.appendChild(script)
}