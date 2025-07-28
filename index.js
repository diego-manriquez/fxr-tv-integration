(function () {
    console.log('📦 ****Script FXR iniciado: buscando iframe de TradingView...');
  
    const INTERVAL = 500;
    const MAX_WAIT = 15000;
    let waited = 0;
    let intervalId = null;
  
    function findTradingViewIframe() {
      const iframes = document.querySelectorAll('iframe');
      const target = Array.from(iframes).find((iframe) =>
        iframe.id.startsWith('tradingview_')
      );
  
      if (target) {
        clearInterval(intervalId);
        console.log('✅ ****Iframe encontrado:', target);
  
        // Esperar a que termine de cargar su contenido
        target.addEventListener('load', () => {
          try {
            const cw = target.contentWindow;
            console.log('✅ ****contentWindow disponible:', cw);
  
            // Puedes intentar inspeccionar si tiene TradingViewApi o tvWidget
            console.log('📊 ****¿tvWidget?:', cw?.tvWidget || cw?.TradingViewApi);
          } catch (e) {
            console.warn('🚫 ****No se pudo acceder al contentWindow:', e);
          }
        });
  
        // Si ya estaba cargado antes del evento 'load'
        if (target.contentWindow?.document?.readyState === 'complete') {
          // Forzar el acceso inmediato si ya cargó
          try {
            console.log('✅ ****contentWindow (cargado previamente):', target.contentWindow);
            console.log('📊 ****¿tvWidget?:', target.contentWindow?.tvWidget || target.contentWindow?.TradingViewApi);
          } catch (e) {
            console.warn('🚫 ****Error accediendo al contentWindow (pre-load):', e);
          }
        }
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
  