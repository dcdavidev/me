import { useEffect } from 'react';

import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import * as CookieConsent from 'vanilla-cookieconsent';

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cc.css';

interface CookieConsentInitProps {
  config: CookieConsentConfig;
}

export function CookieConsentInit({ config }: CookieConsentInitProps) {
  useEffect(() => {
    if (!config) return;

    console.log('CookieConsent: Init...');
    CookieConsent.run(config);
  }, [config]);

  return null;
}
