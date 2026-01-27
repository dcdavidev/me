import * as CookieConsent from 'vanilla-cookieconsent';

/**
 * Interface representing the return value of the useCookieConsent hook.
 */
export interface UseCookieConsent {
  /**
   * Shows the preferences modal (the advanced settings).
   */
  showPreferences: () => void;

  /**
   * Shows the consent modal (the initial banner).
   * @param {boolean} [force=false] - If true, forces the modal to show even if consent is already saved.
   */
  showConsent: (force?: boolean) => void;

  /**
   * Resets the cookie consent, clearing all cookies and reloading the page.
   */
  resetConsent: () => void;

  /**
   * Checks if a specific category is accepted.
   * @param {string} category - The category name (e.g., 'analytics', 'functionality').
   * @returns {boolean} True if the category is accepted.
   */
  isCategoryAccepted: (category: string) => boolean;

  /**
   * Accepts a specific category or categories programmatically.
   * @param {string | string[]} categories - The category or list of categories to accept.
   */
  acceptCategory: (categories: string | string[]) => void;
}

/**
 * Shows the preferences modal (the advanced settings).
 */
const showPreferences = (): void => {
  CookieConsent.showPreferences();
};

/**
 * Shows the consent modal (the initial banner).
 * @param [force] - If true, forces the modal to show even if consent is already saved.
 */
const showConsent = (force: boolean = false): void => {
  CookieConsent.show(force);
};

/**
 * Resets the cookie consent, clearing all cookies and reloading the page.
 */
const resetConsent = (): void => {
  CookieConsent.reset(true);
};

/**
 * Checks if a specific category is accepted.
 * @param category - The category name.
 * @returns True if accepted.
 */
const isCategoryAccepted = (category: string): boolean => {
  return CookieConsent.acceptedCategory(category);
};

/**
 * Accepts a specific category or categories programmatically.
 * @param categories - The category or categories to accept.
 */
const acceptCategory = (categories: string | string[]): void => {
  CookieConsent.acceptCategory(categories);
};

/**
 * Custom hook to interact with the Vanilla Cookie Consent API.
 *
 * NOTE: This hook does NOT initialize the library. Initialization must be done
 * via the `&lt;CookieConsentInit />` component in the root layout.
 *
 * @returns An object containing methods to control the consent interface.
 */
export function useCookieConsent(): UseCookieConsent {
  return {
    showPreferences,
    showConsent,
    resetConsent,
    isCategoryAccepted,
    acceptCategory,
  };
}
