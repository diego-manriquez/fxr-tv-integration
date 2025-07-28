(function () {
    console.log('📦 ****FXR Script started: searching for TradingView iframe...');
  
    const INTERVAL = 500; // Milliseconds between attempts
    const MAX_WAIT = 30000; // Maximum wait time (30 seconds)
    let waited = 0;
    let intervalId = null;
  
    function findTradingViewIframe() {
      const iframes = document.querySelectorAll('iframe');
      const target = Array.from(iframes).find((iframe) =>
        iframe.id.startsWith('tradingview_')
      );
  
      if (target) {
        clearInterval(intervalId);
        console.log('✅ ****Iframe found:', target);
  
        // Wait for the iframe content to finish loading
        target.addEventListener('load', () => {
          try {
            const cw = target.contentWindow;
            console.log('✅ ****contentWindow available:', cw);
            

            setTimeout(() => {

                // Draw green and red horizontal lines
                cw.TradingViewApi.activeChart().createShape(
                  { price: 0.8408 },
                  {
                    shape: 'horizontal_line',
                    lock: true,
                    disableSelection: true,
                    disableSave: true,
                    disableUndo: true,
                    overrides: { linecolor: 'green' }
                  }
                );
      
                cw.TradingViewApi.activeChart().createShape(
                  { price: 0.8404 },
                  {
                    shape: 'horizontal_line',
                    lock: true,
                    disableSelection: true,
                    disableSave: true,
                    disableUndo: true,
                    overrides: { linecolor: 'red' }
                  }
                );
      
                cw.TradingViewApi.activeChart().createShape(
                  { price: 0.8400 },
                  {
                    shape: 'horizontal_line',
                    lock: true,
                    disableSelection: true,
                    disableSave: true,
                    disableUndo: true,
                    overrides: { linecolor: 'blue' }
                  }
                );
            },5000);

  
            // Optionally check for available API references
            console.log('📊 ****tvWidget or TradingViewApi:', cw?.tvWidget || cw?.TradingViewApi);
          } catch (e) {
            console.warn('🚫 ****Failed to access contentWindow:', e);
          }
        });
  
        // If the iframe was already loaded before the 'load' event
        if (target.contentWindow?.document?.readyState === 'complete') {
          // Force immediate access
          try {
            console.log('✅ ****contentWindow (already loaded):', target.contentWindow);
            console.log('📊 ****tvWidget or TradingViewApi:', target.contentWindow?.tvWidget || target.contentWindow?.TradingViewApi);
          } catch (e) {
            console.warn('🚫 ****Error accessing contentWindow (pre-load):', e);
          }
        }
      } else {
        waited += INTERVAL;
        if (waited >= MAX_WAIT) {
          console.warn('⏰ ****No iframe with ID starting with "tradingview_" was found in the expected time.');
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
  