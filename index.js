(function () {
    const INTERVAL = 500; // Milisegundos entre intentos
    const MAX_WAIT = 15000; // Tiempo máximo total (15 segundos)
    let waited = 0;
    let intervalId = null;
  
    function findTradingViewIframe() {
      const iframes = document.querySelectorAll('iframe');
      const target = Array.from(iframes).find((iframe) =>
        iframe.id.startsWith('tradingview_')
      );
  
      if (target) {
        console.log('✅ ****Iframe encontrado:', target);
        clearInterval(intervalId);
      } else {
        waited += INTERVAL;
        if (waited >= MAX_WAIT) {
          console.warn('⏰ ****No se encontró ningún iframe con id que comience con "tradingview_" en el tiempo esperado.');
          clearInterval(intervalId);
        }
      }
    }
  
    function startSearching() {
      intervalId = setInterval(findTradingViewIframe, INTERVAL);
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startSearching);
    } else {
      startSearching();
    }
  })();
  