const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://khachhang:khachhang123@cluster0.7u3tb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);


async function connectDatabase() {
  try {
    await client.connect();
    console.log("Kết nối MongoDB thành công!");
    const db = client.db("DB_CyberHub");

    // Kiểm tra quyền read:
    const products = await db.collection("Products").find().toArray();
    console.log(products);
  } catch (error) {
    console.error("Lỗi kết nối:", error);
  } finally {
    await client.close();
  }
}

connectDatabase();
