import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Scheduled function to send reminder notifications
 * Runs every 5 minutes
 */
export const sendReminders = functions.pubsub
  .schedule('*/5 * * * *')
  .onRun(async (context) => {
    const now = new Date();
    const db = admin.firestore();

    try {
      // Get all users
      const usersSnapshot = await db.collection('users').get();

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;

        // Get enabled reminders where nextRun <= now
        const remindersSnapshot = await db
          .collection('users')
          .doc(userId)
          .collection('reminders')
          .where('enabled', '==', true)
          .where('nextRun', '<=', now.toISOString())
          .get();

        for (const reminderDoc of remindersSnapshot.docs) {
          const reminder = reminderDoc.data();

          // TODO: Send email notification using SendGrid or Firebase Email Extension
          // For now, just log
          console.log(`Sending reminder to user ${userId}:`, reminder.title);

          // Calculate next run time based on schedule
          const nextRun = calculateNextRun(reminder.schedule, reminder.time);

          // Update nextRun
          await reminderDoc.ref.update({
            nextRun: nextRun.toISOString(),
          });
        }
      }

      return null;
    } catch (error) {
      console.error('Error sending reminders:', error);
      return null;
    }
  });

/**
 * Triggered when a new user is created
 * Initializes default collections
 */
export const initializeNewUser = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  const userId = user.uid;

  try {
    // Create default profile
    await db
      .collection('users')
      .doc(userId)
      .collection('profile')
      .doc('data')
      .set({
        name: user.displayName || '',
        partnerName: '',
        loveLanguage: 'words',
        cycleStartDate: new Date().toISOString(),
        cycleLength: 28,
        notificationsEnabled: true,
      });

    // Create welcome reminder
    await db
      .collection('users')
      .doc(userId)
      .collection('reminders')
      .add({
        title: 'Welcome to LoveHerRight!',
        message: 'Start by setting up your profile in Settings',
        schedule: 'daily',
        time: '09:00',
        nextRun: new Date().toISOString(),
        enabled: true,
        createdAt: new Date().toISOString(),
      });

    console.log(`Initialized new user: ${userId}`);
    return null;
  } catch (error) {
    console.error('Error initializing new user:', error);
    return null;
  }
});

/**
 * Helper function to calculate next run time
 */
function calculateNextRun(schedule: string, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);

  // If the time has already passed today, move to next occurrence
  if (next <= new Date()) {
    switch (schedule) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
    }
  }

  return next;
}
