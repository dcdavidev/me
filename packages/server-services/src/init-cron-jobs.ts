import cron from 'node-cron';

import { prisma } from '@repo/server-models';

/**
 * Initializes the cron jobs for the application.
 *
 * Jobs:
 * - Cleanup Expired OTPs: Runs every 15 minutes.
 */
export function initCronJobs(): void {
  // Schedule task to run every 15 minutes
  // Cron syntax: * * * * * (minute hour day-of-month month day-of-week)
  cron.schedule('*/15 * * * *', async () => {
    console.log('[Cron] Starting cleanup of expired OTPs...');

    try {
      const now = new Date();

      const result = await prisma.oneTimePassword.deleteMany({
        where: {
          expiresAt: {
            lt: now, // "Less than" now
          },
        },
      });

      if (result.count > 0) {
        console.log(`[Cron] Deleted ${result.count} expired OTP(s).`);
      }
    } catch (error) {
      console.error('[Cron] Error deleting expired OTPs:', error);
    }
  });

  console.log('[Cron] Jobs initialized.');
}
