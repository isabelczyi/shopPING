class AddNearbyDistanceToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :nearby_distance, :integer, :default => 5
  end
end
