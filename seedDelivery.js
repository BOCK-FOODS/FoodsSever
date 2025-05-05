import mongoose from 'mongoose';
import { DeliveryPartner } from './src/models/user.js'; // Corrected import

mongoose.connect('mongodb+srv://bockservices:bock-services123@cluster1.aowgmai.mongodb.net/bockfoods?retryWrite>
  .then(async () => {
    await DeliveryPartner.create({
      name: 'John Delivery',
      email: 'bock.infos@gmail.com',
      password: 'Admin@123',
      phone: 9876543210,
    });
    console.log('Delivery partner inserted.');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
