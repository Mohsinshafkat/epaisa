document.addEventListener("DOMContentLoaded", function() {
    // 1. CSS Styles dynamically inject karein
    if (!document.getElementById('global-loader-style')) {
        const style = document.createElement('style');
        style.id = 'global-loader-style';
        style.innerHTML = `
          .loader-overlay {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: #000000af;
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 99999;
          }
          .loader-overlay.active {
            display: flex;
          }
          .loading-box {
            display: flex;
            align-items: center;
            background-color: #ffffff;
            padding: 18px 18px;
            border-radius: 6px;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
            gap: 16px;
            width: 80%;
            height: 7%;
            max-width: 320px;
          }
          .spinner-container {
            position: relative;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .spinner {
            width: 100%;
            height: 100%;
            border: 2.5px solid #e2e8f0;
            border-top: 2.5px solid #10b981;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
          }
          .inner-logo {
            position: absolute;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .inner-logo img {
            width: 130%;
            height: 130%;
            object-fit: contain;
          }
          .loading-text {
            font-size: 13px;
            color: #1e293b;
            font-weight: 400;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
    }

    // 2. HTML Markup dynamically body ke shuru mein lagayein
    if (!document.getElementById('global-loader')) {
        const loaderDiv = document.createElement('div');
        loaderDiv.innerHTML = `
          <div id="global-loader" class="loader-overlay">
              <div class="loading-box">
                  <div class="spinner-container">
                      <div class="spinner"></div>
                      <div class="inner-logo">
                          <img src="elogo.png" alt="Logo">
                      </div>
                  </div>
                  <span class="loading-text">Loading, please wait.</span>
              </div>
          </div>
        `;
        document.body.prepend(loaderDiv);
    }
});

// Global Functions (Show/Hide ke liye)
function showLoader() {
  const loader = document.getElementById('global-loader');
  if (loader) loader.classList.add('active');
}

function hideLoader() {
  const loader = document.getElementById('global-loader');
  if (loader) loader.classList.remove('active');
}

// Page load ya back hone par auto-hide
window.addEventListener('pageshow', () => {
  hideLoader();
});