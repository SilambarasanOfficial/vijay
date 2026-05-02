require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const exists = await User.findOne({ username: 'admin' });
  if (exists) {
    console.log('Admin user already exists. Skipping seed.');
  } else {
    await User.create({ username: 'admin', password: 'vjphoto@2024' });
    console.log('✅ Admin user created');
    console.log('   Username: admin');
    console.log('   Password: vjphoto@2024');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
