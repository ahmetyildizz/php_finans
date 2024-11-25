<?php
class Goal {
    private $conn;
    private $table_name = "goals";

    public $id;
    public $user_id;
    public $name;
    public $target_amount;
    public $current_amount;
    public $deadline;
    public $category;
    public $status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    user_id = :user_id,
                    name = :name,
                    target_amount = :target_amount,
                    current_amount = :current_amount,
                    deadline = :deadline,
                    category = :category,
                    status = 'active'";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":target_amount", $this->target_amount);
        $stmt->bindParam(":current_amount", $this->current_amount);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":category", $this->category);

        return $stmt->execute();
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name,
                    target_amount = :target_amount,
                    current_amount = :current_amount,
                    deadline = :deadline,
                    category = :category,
                    status = :status
                WHERE id = :id AND user_id = :user_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":target_amount", $this->target_amount);
        $stmt->bindParam(":current_amount", $this->current_amount);
        $stmt->bindParam(":deadline", $this->deadline);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":status", $this->status);

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " 
                WHERE id = :id AND user_id = :user_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":user_id", $this->user_id);

        return $stmt->execute();
    }

    public function getUserGoals() {
        $query = "SELECT * FROM " . $this->table_name . "
                WHERE user_id = :user_id
                ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }
}
?>