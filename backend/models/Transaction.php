<?php
class Transaction {
    private $conn;
    private $table_name = "transactions";

    public $id;
    public $user_id;
    public $category;
    public $amount;
    public $type;
    public $description;
    public $date;
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
                    type = :type,
                    description = :description,
                    date = :date";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":date", $this->date);

        return $stmt->execute();
    }

    public function getUserTransactions() {
        $query = "SELECT *
                FROM " . $this->table_name . "
                WHERE user_id = :user_id
                ORDER BY date DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }
}
?>