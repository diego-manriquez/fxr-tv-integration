(function () {
    function findTradingViewIframe() {
      const iframes = document.querySelectorAll('iframe');
      const target = Array.from(iframes).find((iframe) =>
        iframe.id.startsWith('tradingview_')
      );
  
      if (target) {
        console.log('✅ Iframe encontrado:', target);
      } else {
        console.warn('⚠️ No se encontró ningún iframe con id que comience con "tradingview_"');
      }
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', findTradingViewIframe);
    } else {
      findTradingViewIframe();
    }
  })();
  