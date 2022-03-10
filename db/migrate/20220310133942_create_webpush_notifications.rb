class CreateWebpushNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :webpush_notifications do |t|
      t.string :endpoint
      t.string :auth_key
      t.string :p256dh_key

      t.timestamps
    end
  end
end
