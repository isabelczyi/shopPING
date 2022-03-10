class WebpushNotification < ApplicationRecord
  def pushnotification(message)
    Webpush.payload_send(
      message: message,
      endpoint: endpoint,
      p256dh: p256dh_key,
      auth: auth_key,
      vapid: {
        subject: "mailto:sender@example.com",
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY'],
        expiration: 12 * 60 * 60
      },
    ssl_timeout: 5, # value for Net::HTTP#ssl_timeout=, optional
    open_timeout: 5, # value for Net::HTTP#open_timeout=, optional
    read_timeout: 5 # value for Net::HTTP#read_timeout=, optional
  )
  end
end
