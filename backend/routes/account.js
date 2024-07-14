const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router()

router.get('/balance', authMiddleware, async(req,res) => {
  const account = await Account.findOne({
    userId: req.userId
  });

  if(account){
    return res.json({
      balance: account.balance
    })
  }

  res.json({})
})

router.post('/transfer', authMiddleware, async(req,res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try{
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId
  }).session(session);

  if(!account || account.balance < amount){
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: 'Insufficient balance'
    })
  };

  const toAccount = await Account.findOne({
    userId: to
  }).session(session);

  if(!toAccount){
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: 'Invalid account'
    })
  };

  await Account.updateOne({ 
    userId: req.userId 
  }, {
    $inc: { 
      balance: -amount
    }
  });

  await Account.updateOne({
    userId: to
  }, {
    $inc: {
      balance: amount
    }
  });

  await session.commitTransaction();
  session.endSession();
  res.json({
    message: 'Transfer succesful'
  });
}catch(err){
  await session.abortTransaction();
  session.endSession();
  res.json({
    message: 'Internal server error',
    error: err.message
  })
}

});

module.exports = router;