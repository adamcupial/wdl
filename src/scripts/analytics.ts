import onIdle from 'scripts/on-idle';

export default function injectAnalytics () {
  onIdle(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-10090520-2';
    script.async = true;
    document.head.append(script);
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args) => {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'UA-10090520-2');
  });
}
