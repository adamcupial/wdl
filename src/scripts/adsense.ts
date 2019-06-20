import onIdle from 'scripts/on-idle';

export default function injectAdsense() {
  onIdle(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    document.head.append(script);

    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-0899312678320659",
      enable_page_level_ads: true
    });
  });
}
