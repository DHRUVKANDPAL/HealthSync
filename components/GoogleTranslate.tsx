import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Ensure we clear the translation state before loading the script
    const resetTranslationState = () => {
      // Remove the Google Translate language code from the URL (if any)
      if (window.location.search.includes('hl=')) {
        const newUrl = window.location.href.replace(/([&?])hl=[a-z]{2}/, ''); // Remove `hl` query param
        window.history.replaceState(null, '', newUrl); // Replace the URL without the `hl` query
      }
    };

    // Clear the translation state before loading the script
    resetTranslationState();

    const loadGoogleTranslateScript = async () => {
      const scriptId = 'google-translate-script';

      // Check if the script is already loaded
      if (document.getElementById(scriptId)) {
        console.log('Google Translate script already exists.');
        return; // Script is already loaded
      }

      // Create and load the script asynchronously
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      // Append the script to the body
      document.body.appendChild(script);

      // Wait for the script to load
      await new Promise((resolve, reject) => {
        script.onload = () => {
          console.log('Google Translate script loaded successfully.');
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Google Translate script.');
          reject(new Error('Google Translate script failed to load.'));
        };
      });

      // Define the googleTranslateElementInit after the script is loaded
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en', // Set the default page language
              autoDisplay: false, // Prevent auto-translation on page load
            },
            'google_translate_element'
          );
        } else {
          console.error('Google Translate API not loaded.');
        }
      };
    };

    // Call the async function inside useEffect
    loadGoogleTranslateScript();

    // Cleanup: remove the script when the component is unmounted
    return () => {
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
