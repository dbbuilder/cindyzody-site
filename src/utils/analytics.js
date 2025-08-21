export function loadAnalytics() {
  // Google Analytics 4
  const gaId = import.meta.env.VITE_GA_ID
  if (gaId) {
    const s1 = document.createElement('script')
    s1.async = true
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(s1)

    const s2 = document.createElement('script')
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });
    `
    document.head.appendChild(s2)
  }

  // Meta Pixel (optional)
  const metaId = import.meta.env.VITE_META_PIXEL_ID
  if (metaId) {
    const s = document.createElement('script')
    s.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js'); fbq('init','${metaId}'); fbq('track','PageView');
    `
    document.head.appendChild(s)
  }

  // LinkedIn Insight Tag (optional)
  const linkedinId = import.meta.env.VITE_LINKEDIN_PARTNER_ID  if (linkedinId) {
    const s = document.createElement('script')
    s.innerHTML = `
      _linkedin_partner_id = "${linkedinId}";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `
    document.head.appendChild(s)
    const s2 = document.createElement('script')
    s2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    s2.async = true
    document.head.appendChild(s2)
  }
}

export function trackEvent(name, params = {}) {
  // GA4 event
  if (window.gtag) window.gtag('event', name, params)
  // Meta event
  if (window.fbq) window.fbq('trackCustom', name, params)
}