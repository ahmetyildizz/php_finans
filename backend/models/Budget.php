<?php
class Budget {
    private $conn;
    private $table_name = "budgets";

    public $id;
    public $user_id;
    public $category;
    public $amount;
    public $start_date;
    public $end_date;
    public $description;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    user_id = :user_id,
                    category = :category,
                    amount = :amount,
                    start_date = :start_date,
                    end_date = :end_date,
                    description = :description";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":description", $this->description);

        return $stmt->execute();
    }

    public function getUserBudgets() {
        $query = "SELECT *
                FROM " . $this->table_name . "
                WHERE user_id = :user_id
                ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }
}
?>