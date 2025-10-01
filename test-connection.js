const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('🧪 Testing MongoDB Atlas connection...');
  console.log('📋 Connection details:');
  console.log(`   URI: ${process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@')}`);
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
    });
    
    console.log('✅ Connection successful!');
    console.log(`📍 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`📊 Ready State: ${conn.connection.readyState}`);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'Connection test successful' });
    await testDoc.save();
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Database delete test successful!');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting suggestions:');
    console.log('   1. Check if your MongoDB Atlas cluster is running');
    console.log('   2. Verify your username and password');
    console.log('   3. Ensure your IP address is whitelisted');
    console.log('   4. Check your network connectivity');
    console.log('   5. Try accessing MongoDB Atlas dashboard directly');
  }
  
  process.exit(0);
};

testConnection();