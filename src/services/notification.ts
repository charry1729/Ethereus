type NotificationType = 'success' | 'error' | 'info' | 'warning';

class NotificationService {
  private createNotification(message: string, type: NotificationType) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // In a real app, this would integrate with a toast/notification library
  }

  success(message: string) {
    this.createNotification(message, 'success');
  }

  error(message: string) {
    this.createNotification(message, 'error');
  }

  info(message: string) {
    this.createNotification(message, 'info');
  }

  warning(message: string) {
    this.createNotification(message, 'warning');
  }
}

export const notificationService = new NotificationService();