const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router()

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string()
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

router.post('/signup', async(req,res) => {
  const {success} = signupBody.safeParse(req.body);
  if (!success){
    return res.status(411).json({
      message: 'Incorrect inputs'
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  })

  
  if (existingUser){
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs'
    })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random()* 10000
  })

  const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET)

  res.status(200).json({
    message: 'User created successfully',
    token: token
  });
});

router.post('/signin', async(req,res) => {
  const {success} = signupBody.safeParse(req.body);
  if (!success){
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs'
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })

  if (user){
    const userId = user._id;
    const token = jwt.sign({
      userId
    }, process.env.JWT_SECRET)

    return res.status(200).json({
      token: token
    })
  }

  res.status(411).json({
    message: 'Error while logging in'
  });
});

router.put('/', authMiddleware, async(req,res) => {
  const {success} = updateBody.safeParse(req.body);
  if (!success){
    return res.status(411).json({
      message: 'Incorrect inputs'
    })
  }

  await User.updateOne({ _id: req.userId}, req.body)

  res.json({
    message: 'Updated successfully'
  });
});

router.get('/bulk', async(req,res) => {
  const filter = req.query.filter || '';
  const users = await User.find({
    $or: [{
      firstName: {'$regex': filter, '$options': 'i'}
    },{
      lastName: {'$regex': filter, '$options': 'i'} 
    }]
  })

  return res.json({
    users: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  });

})

module.exports = router;